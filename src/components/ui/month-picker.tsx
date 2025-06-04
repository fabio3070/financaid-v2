import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTH_OPTIONS } from "@/lib/constants/month";

type MonthSelectionBoxProps = {
    selectedMonth: string;
    setSelectedMonth: (value: string) => void;
    className?: string;
}

export const MonthSelectionBox: React.FC<MonthSelectionBoxProps> = ({ selectedMonth, setSelectedMonth, className= "" }) => {

    return (
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger 
                className={`w-28 md:w-[180px] ${className}`}
            >
                <SelectValue placeholder="Select a month"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Choose an option...</SelectLabel>
                    {MONTH_OPTIONS.map(({value, label}) => (
                        <SelectItem 
                        key={value} 
                        value={value.toString()}
                        >
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};