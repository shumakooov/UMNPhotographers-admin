export type Photographer = {
  id: number;
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  birthdate: string;
  phone: string;
  contacts: {
    vk: string | null;
    tg: string | null;
  } | null;
  score: number | null;
  status: "created" | "blocked" | "approved";
  registrationDate: string;
  description: string | null;
  trainee: boolean;
  portfolio: string | null;
  techniqueInfoId: number;
};

export type NewPhotographer = {
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  trainee?: boolean;
  description?: string;
};

export type Evaluation = {
  id: number;
  photographer: {
    id: number;
    firstname: string;
    surname: string;
    middleName: string;
  };
  event: {
    id: number;
    name: string;
    level: string;
  };
  zone: {
    id: number;
    number: number;
  };
  quality: number;
  punctuality: number;
  judgment: number;
  comment: string;
};

export type EvaluationRow = {
  id: number;
  photographer: string;
  zone: number;
  quality: number;
  punctuality: number;
  judgment: number;
  comment: string;
};
