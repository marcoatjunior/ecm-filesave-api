export interface TicketRequest {
  userId: string;
  password: string;
}

export interface TicketResponse {
  entry: TicketEntry;
}

export interface TicketEntry {
  id: string;
  userId: string;
}
