export type getParticipant = {
  id: number;
  event_id: number;
  event_name: string;
  name: string;
  email: string;
};

export type createParticipant = {
  event_id: number;
  name: string;
  email: string;
};

export type updateParticipant = {
  event_id: number;
  name: string;
  email: string;
};