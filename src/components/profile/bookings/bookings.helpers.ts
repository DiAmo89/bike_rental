export function getBookingStatus(startDate: string, endDate: string) {
    const today = new Date();
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > today) return "upcoming";
    if (end < today) return "completed";
    return "active";
  }
  