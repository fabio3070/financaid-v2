import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <section className="w-[480px] p-3 rounded-2xl bg-neutral-800">
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <Skeleton className="w-[80px] h-[20px] rounded-full" />
            </div>
            <Skeleton className="w-[200px] h-[40px] rounded-lg" />
        </section>
    )
}
