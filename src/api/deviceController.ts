import instance from "./instance";
import { Camera, Battery, Lens, Flash, Memory } from "../types/device";

export default class DeviceController {
  static async getAllByType(
    type: string,
  ): Promise<Camera[] | Battery[] | Lens[] | Flash[] | Memory[]> {
    const { data } = await instance.get(`/technique/${type}`);
    return data.technique;
  }
}
