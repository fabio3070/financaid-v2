export default function TotalBalanceSkeleton() {
    return (
        <section className="w-full md:w-[480px] p-6 rounded-2xl bg-muted-foreground/20 animate-pulse">
            <div className='flex justify-between items-center'>
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-9 w-28 md:w-[180px] bg-muted rounded"></div>
            </div>
            <div className="h-12 w-32 bg-muted rounded mt-4 mb-8"></div>
            <div className='divider'></div>
            <div className='flex items-center mt-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                    <div className="h-4 w-20 bg-muted rounded"></div>
                    <div className="h-9 w-24 bg-muted rounded"></div>
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                    <div className="h-4 w-20 bg-muted rounded"></div>
                    <div className="h-9 w-24 bg-muted rounded"></div>
                </div>
            </div>
        </section>
    )
} 