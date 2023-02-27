import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { IJob } from '../models/IJob';
import { GridModel } from '../models/models';

const ELEMENT_DATA_FromDb: IJob[] = [
  {
    jobGUID: '9444ee53-ad48-11ed-96ed-02c30ba6082b',
    jobType: 'Job Scheduler',
    jobTypeGUID: '9444ee53-ad48-11ed-96ed-02c30ba6082b',
    startTime: '',
    intervalMinutes: 109,
    scheduleStartDate: '',
    jobIsTimedOutMinutes: 0,
    stopTime: '',
    stopOnSuccessYN: 'N',
    activeYN: 'Y',
    deletedYN: 'N',
  },
  {
    jobGUID: '9444f212-ad48-11ed-96ed-02c30ba6082b',
    jobType: 'Job Runner',
    jobTypeGUID: '9444f212-ad48-11ed-96ed-02c30ba6082b',
    startTime: '',
    intervalMinutes: 0,
    scheduleStartDate: '',
    jobIsTimedOutMinutes: 0,
    stopTime: '',
    stopOnSuccessYN: 'N',
    activeYN: 'Y',
    deletedYN: 'N',
  },
  {
    jobGUID: '953b8f04-ad48-11ed-96ed-02c30ba6082b',
    jobType: 'Job Scheduler - Triggered',
    jobTypeGUID: '953b8f04-ad48-11ed-96ed-02c30ba6082b',
    startTime: '',
    intervalMinutes: 99,
    scheduleStartDate: '',
    jobIsTimedOutMinutes: 0,
    stopTime: '',
    stopOnSuccessYN: 'N',
    activeYN: 'Y',
    deletedYN: 'N',
  },
];

const ELEMENT_DATA: IJob[] = [
  {
    jobGUID: ' ',
    jobType: 'Loading data ...',
    jobTypeGUID: ' ',
    startTime: ' ',
    intervalMinutes: 0,
    scheduleStartDate: '',
    jobIsTimedOutMinutes: 0,
    stopTime: '',
    stopOnSuccessYN: ' ',
    activeYN: ' ',
    deletedYN: ' ',
  },
];

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  pageTitle = 'Job Maintenance - Job';
  jobList: IJob[] = [];
  jobCount: number | undefined = 0;
  errorMessage: string | undefined = '';

  public selectedItem!: IJob;
  public gridModel!: GridModel<IJob>;
  displayedColumns: string[] = [
    'jobType',
    'startTime',
    'intervalMinutes',
    'scheduleStartDate',
    'jobIsTimedOutMinutes',
    'stopTime',
    'stopOnSuccessYN',
    'activeYN',
    'deletedYN',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  async loadData() {
    console.log('loadData() enter');

    // Load data calling an API
    this.jobList = ELEMENT_DATA_FromDb;

    /** < Form Builder Stuff > */
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        this.jobList.map((val) =>
          this.fb.group({
            jobType: new FormControl(val.jobType),
            startTime: new FormControl(val.startTime, [
              Validators.minLength(5),
              Validators.maxLength(5),
            ]),
            intervalMinutes: new FormControl(val.intervalMinutes, [
              Validators.pattern('^[0-9]*$'),
            ]),
            scheduleStartDate: new FormControl(val.scheduleStartDate, [
              Validators.pattern(
                /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
              ),
            ]),
            jobIsTimedOutMinutes: new FormControl(val.jobIsTimedOutMinutes, [
              Validators.pattern('^[0-9]*$'),
            ]),
            stopTime: new FormControl(val.stopTime, [
              Validators.minLength(5),
              Validators.maxLength(5),
            ]),
            stopOnSuccessYN: new FormControl(val.stopOnSuccessYN, [
              Validators.minLength(1),
              Validators.maxLength(1),
            ]),
            activeYN: new FormControl(val.activeYN),
            deletedYN: new FormControl(val.deletedYN),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
    /** </ Form Builder Stuff > */

    console.log('loadData() leave');
  }

  async ngOnInit() {
    console.log('Executing:  ngOnInit()');

    /** < Form Builder Stuff > */
    // Initialize the FormBuilder with one dummy row so it doesnt crash
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });

    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            jobType: new FormControl(val.jobType),
            startTime: new FormControl(val.startTime, [
              Validators.minLength(5),
              Validators.maxLength(5),
            ]),
            intervalMinutes: new FormControl(val.intervalMinutes, [
              Validators.pattern('^[0-9]*$'),
            ]),
            scheduleStartDate: new FormControl(val.scheduleStartDate, [
              Validators.pattern(
                /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
              ),
            ]),
            jobIsTimedOutMinutes: new FormControl(val.jobIsTimedOutMinutes, [
              Validators.pattern('^[0-9]*$'),
            ]),
            stopTime: new FormControl(val.stopTime, [
              Validators.minLength(5),
              Validators.maxLength(5),
            ]),
            stopOnSuccessYN: new FormControl(val.stopOnSuccessYN, [
              Validators.minLength(1),
              Validators.maxLength(1),
            ]),
            activeYN: new FormControl(val.activeYN),
            deletedYN: new FormControl(val.deletedYN),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };

    // Custom filter according to name column
    this.dataSource.filterPredicate = (
      data: { name: string },
      filterValue: string
    ) => data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
    /** </ Form Builder Stuff > */

    // Now get the real data from the database
    await this.loadData();

    this.jobCount = this.jobList.length;
    console.log('... done ...');
  }

  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement: any, i: any) {
    console.log('VOFormElement...', VOFormElement);
    if (VOFormElement.status === 'VALID') {
      VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);

      this.jobList[i].startTime = VOFormElement.get('VORows')
        .at(i)
        .get('startTime').value;
      this.jobList[i].intervalMinutes = VOFormElement.get('VORows')
        .at(i)
        .get('intervalMinutes').value;
      this.jobList[i].scheduleStartDate = VOFormElement.get('VORows')
        .at(i)
        .get('scheduleStartDate').value;
      this.jobList[i].jobIsTimedOutMinutes = VOFormElement.get('VORows')
        .at(i)
        .get('jobIsTimedOutMinutes').value;
      this.jobList[i].stopTime = VOFormElement.get('VORows')
        .at(i)
        .get('stopTime').value;
      this.jobList[i].stopOnSuccessYN = VOFormElement.get('VORows')
        .at(i)
        .get('stopOnSuccessYN').value;
      this.jobList[i].activeYN = VOFormElement.get('VORows')
        .at(i)
        .get('activeYN').value;
      this.jobList[i].deletedYN = VOFormElement.get('VORows')
        .at(i)
        .get('deletedYN').value;

      const data: string = JSON.stringify(this.jobList[i]);
      console.log('VOForm...', this.VOForm);
      console.log('data:  ' + data);
    }
    // Save the data to the db now
    /** NOTE!  if this returns an error we need to alert the user and may unde the changes in the row */

    // const response = this.apiV2
    //   .updateJob({ body: this.jobList[i] })
    //   .toPromise();
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    // Replace the edited value with the original value, and refures the UI.
    VOFormElement.get('VORows').patchValue(
      [{ startTime: this.jobList[i].startTime }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ intervalMinutes: this.jobList[i].intervalMinutes }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ scheduleStartDate: this.jobList[i].scheduleStartDate }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ jobIsTimedOutMinutes: this.jobList[i].jobIsTimedOutMinutes }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ stopTime: this.jobList[i].stopTime }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ stopOnSuccessYN: this.jobList[i].stopOnSuccessYN }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ activeYN: this.jobList[i].activeYN }],
      { onlySelf: false, emitEvent: false }
    );
    VOFormElement.get('VORows').patchValue(
      [{ deletedYN: this.jobList[i].deletedYN }],
      { onlySelf: false, emitEvent: false }
    );

    // trigger change detection
    this.cd.detectChanges();
  }
}
