export default function IncomeListSkeleton() {
    return (
        <ul className="flex flex-col gap-8 mt-4 ">
            <li className="bg-custom-background-dark-grey animate-pulse w-full md:w-[480px] h-16 rounded-full"></li>
            <li className="bg-custom-background-dark-grey animate-pulse w-full md:w-[480px] h-16 rounded-full"></li>
            <li className="bg-custom-background-dark-grey animate-pulse w-full md:w-[480px] h-16 rounded-full"></li>
        </ul>
    )
}