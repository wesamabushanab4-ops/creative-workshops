export interface Instructor {
  _id: string;
  name: string;
}

export interface Workshop {
  _id: string;
  instructorId: string;
  startAt: string;
  endAt: string;
  topic: string;
  room: string;
}

export interface WorkshopPayload {
  instructorId: string;
  startAt: string;
  endAt: string;
  topic: string;
  room: string;
}
