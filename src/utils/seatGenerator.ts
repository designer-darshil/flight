import { Seat } from '../types';

export function generateAerivaSeats(): Seat[] {
  const seats: Seat[] = [];
  const occupiedPreset = new Set([
    '1A', '2D', '3C', '4F', '5B', '10C', '10D', '11A', '12B', '14C', '15E',
    '16A', '17D', '19B', '20C', '21A', '22E', '24B', '25D', '28A', '30C', '32E'
  ]);

  // BUSINESS CLASS: Rows 1-5 (2-2 spacious seating: A, C || D, F)
  for (let r = 1; r <= 5; r++) {
    ['A', 'C', 'D', 'F'].forEach(col => {
      const id = `${r}${col}`;
      const isOcc = occupiedPreset.has(id);
      seats.push({
        id,
        row: r,
        col,
        cabin: 'Business',
        status: isOcc ? 'occupied' : 'available',
        priceINR: 4800,
        isWindow: col === 'A' || col === 'F',
        isAisle: col === 'C' || col === 'D',
        pitchInches: 42,
      });
    });
  }

  // ECONOMY CLASS: Rows 10-35 (3-3 seating: A, B, C || D, E, F)
  for (let r = 10; r <= 35; r++) {
    const isExitRow = r === 18; // Row 18 is Emergency Exit Row with Extra Legroom (+38")
    const isFrontRow = r === 10; // Row 10 is Bulkhead Extra Legroom

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
      const id = `${r}${col}`;
      const isOcc = occupiedPreset.has(id);
      let status: Seat['status'] = isOcc ? 'occupied' : 'available';
      let price = 0;

      if (isExitRow || isFrontRow) {
        status = isOcc ? 'occupied' : 'extra_legroom';
        price = 2400; // Prompt: 18A Window Extra legroom ₹2,400
      } else if (col === 'A' || col === 'F') {
        price = 600; // Window seat preference
      } else if (col === 'C' || col === 'D') {
        price = 400; // Aisle seat preference
      }

      seats.push({
        id,
        row: r,
        col,
        cabin: 'Economy',
        status,
        priceINR: price,
        isWindow: col === 'A' || col === 'F',
        isAisle: col === 'C' || col === 'D',
        isExitRow: isExitRow || isFrontRow,
        pitchInches: (isExitRow || isFrontRow) ? 38 : 32,
      });
    });
  }

  return seats;
}
