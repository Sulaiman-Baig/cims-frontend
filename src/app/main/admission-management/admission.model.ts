export class Admission {


    id: string;
    
    installments: {
        installment: number,
        due_date: string
    }[];

    student_academic_record: {
        certificate: string,
        institute: string,
        year: string,
        percentage: number
    }[];
    userId: number;
    campusId: number;
    courseId: number;
    batchId: number;
    inquiryId: number;
    student_name: string;
    guardian_name: string;
    dob: string;
    nic: number;
    gender: string;
    nationality: string;
    personal_contact: string;
    guardian_contact: string;
    email: string;
    postal_address: string;
    registeration_no: string;
    roll_no: number;
    admission_date: string;
    registeration_fee: number;
    fee_package: number;
    fee_package_after_discount: number;
    discount: number;
    is_installment: boolean;
    remarks: string;
    // students: any [];



}


