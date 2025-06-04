export default function ExpensesListSkeleton() {
    return (
        <ul className="flex flex-col gap-8 mt-4 ">
            <li className="bg-muted animate-pulse w-full px-6 md:px-10 md:w-[480px] h-16 rounded-full"></li>
            <li className="bg-muted animate-pulse w-full px-6 md:px-10 md:w-[480px] h-16 rounded-full"></li>
            <li className="bg-muted animate-pulse w-full px-6 md:px-10 md:w-[480px] h-16 rounded-full"></li>
        </ul>
    )
}