export class Event {


    id: string;
    type: string;
    highlights: {
        highlight: string
    }[];
    speakers: {
        name: string,
        short_description: string,
        image: string
    }[];
    title: string;
    venue: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    image: string;
    video: string;
    description: string;
    postal_address: string;
    registeration_no: string;
    roll_no: number;
    admission_date: string;
    registeration_fee: number;
    fee_package: number;
    fee_package_after_discount: number;
    discount: number;
    is_installment: string;
    remarks: string;




}


