import { DateTime } from 'aws-sdk/clients/devicefarm';
// npm install aws-sdk

export interface IJob {
  jobGUID?: string;
  jobTypeGUID?: string;
  jobType?: string;
  scheduleTypeGUID?: string;
  scheduleType?: string;
  scheduleHolidayAdjustmentGUID?: string;
  scheduleHolidayAdjustment?: string;
  scheduleStartDate?: string;
  startTime?: string;
  jobIsTimedOutMinutes?: Number;
  intervalMinutes?: Number;
  stopTime?: string;
  stopOnSuccessYN?: string;
  activeYN?: string;
  modSessionGUID?: string;
  modDateTimeGMT?: DateTime;
  modFunction?: string;
  deletedYN?: string;
  jobCategoryGUID?: string;
  jobCategory?: string;
  environment?: string;
  editing?: boolean;
  isEditable?: boolean;
  isNewRow?: boolean;
}
