import instance from "./instance";
import { AxiosResponse } from "axios";
import {
  Evaluation,
  Photographer,
  NewPhotographer,
} from "../types/photographer";

export default class PhotographerController {
  static async getAll(): Promise<Photographer[]> {
    const { data } = await instance.get("/photographer/all?page=0&size=30");
    return data.list;
  }

  static async getById(id: string | undefined): Promise<Photographer> {
    const { data } = await instance.get(`/photographer/${id}`);
    return data;
  }

  static async create(formData: NewPhotographer): Promise<AxiosResponse<null>> {
    return instance.post("/photographer/create", formData);
  }

  static async edit(
    formData: Omit<Photographer, "registrationDate" | "techniqueInfoId">,
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
