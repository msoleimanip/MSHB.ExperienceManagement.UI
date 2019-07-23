import { EquipmentAttachmentType } from './../enums/equipmentAttachmentType';

export class EquipmentAttachmentViewModel {
  equipmentAttachmentId: number;
  equipmentId: number;
  equipmentAttachmentName: string;
  equipmentAttachmentType: EquipmentAttachmentType;
  description: string;
  creationDate?: string;
  fileType: string;
  fileSize?: number;
  fileId?: string;
}
