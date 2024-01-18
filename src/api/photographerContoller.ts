import instance from "./instance";
import { AxiosResponse } from "axios";
import { Evaluation } from "../types/photographer";

type NewUser = {
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  trainee?: boolean;
  description?: string;
};

type UserInfo = {
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

type ResponseGetAll = {
  list: UserInfo[];
  count: number;
};

export default class PhotographerController {
  static async getAll(): Promise<AxiosResponse<ResponseGetAll>> {
    return instance.get("/photographer/all");
  }

  static async getById(id: string | undefined): Promise<UserInfo> {
    const { data } = await instance.get(`/photographer/${id}`);
    return data;
  }

  // static async create(formData: NewUser): Promise<null> {}

  static async edit(
    formData: Omit<UserInfo, "registrationDate" | "techniqueInfoId">,
  ): Promise<AxiosResponse<null>> {
    return instance.put("/photographer/edit", formData);
  }

  static async getEvaluationAll(eventId: string): Promise<Evaluation[]> {
    const { data } = await instance.get(
      `/evaluation/all?eventId=${eventId}&page=0&size=100`,
    );
    return data.list;
  }
}
