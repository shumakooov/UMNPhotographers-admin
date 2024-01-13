import instance from "./instance";

type newUser = {
  email: string;
  firstname: string;
  surname: string;
  middleName: string;
  trainee?: boolean;
  description?: string;
};

type userInfo = {
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

type responseGetAll = {
  list: userInfo[];
  count: number;
};

export default class PhotographerContoller {
  static async getAll(): Promise<responseGetAll> {
    return instance.get("/photographer/all");
  }

  static async getById(id: string | undefined): Promise<userInfo> {
    const { data } = await instance.get(`/photographer/${id}`);
    return data;
  }

  // static async create(formData: newUser): Promise<null> {}

  static async edit(
    formData: Omit<userInfo, "registrationDate" | "techniqueInfoId">
  ): Promise<null> {
    const { data } = await instance.put("/photographer/edit", formData);
    console.log(data);

    return data;
  }
}
