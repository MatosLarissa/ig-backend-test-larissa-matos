import moment from "moment"

export class DateFormat {

    public formatPT(date: Date) {
        let formatDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") as unknown as Date
        return formatDate
    }
    
}