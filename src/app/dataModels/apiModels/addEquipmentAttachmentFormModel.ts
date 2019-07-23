import { EquipmentAttachmentType } from './../enums/equipmentAttachmentType';

export class AddEquipmentAttachmentFormModel {
  equipmentId: number;
  equipmentAttachmentName: string;
  equipmentAttachmentType: EquipmentAttachmentType;
  description: string;
  uploadFileId?: string;

}
