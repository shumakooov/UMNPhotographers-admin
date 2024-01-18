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
