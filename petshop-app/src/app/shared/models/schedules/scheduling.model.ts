import { ProfessionalInfo } from "../../enums/professional-info.enum";
import { SchedulingStatus } from "../../enums/scheduling-status.enum";
import { ServiceType } from "../../enums/service-type.enum";

export interface Scheduling {
    id: number;
    schedulingDateTime: String;
    serviceType: ServiceType;
    professionlInfo: ProfessionalInfo;
    consultationReason?: String;
    additionalNotes?: String;
    status: SchedulingStatus;
}