export class UpdatePropertyStatusDto {
  status!: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}
