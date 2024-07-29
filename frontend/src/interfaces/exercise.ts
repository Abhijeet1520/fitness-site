export  interface Exercise {
    id: number;                    // Required ID
    week: number;                  // Foreign key represented as a number
    day: number;                   // Foreign key represented as a number
    exercise_number?: number;     // Optional field
    title?: string;               // Optional field
    type?: 'Warmup' | 'Exercise' | 'Stretching'; // Optional field with specific values
    sets?: number;                // Optional field
    reps?: number;                // Optional field
    duration?: string;            // Optional field (Duration in ISO 8601 format, e.g., 'PT10M')
    description?: string;         // Optional field
    video_url?: string;           // Optional field
    created_at: string;           // ISO 8601 date string, representing creation timestamp
    complete_url?: string;
  }
