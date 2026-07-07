interface Props {
    label: string;
    value: number;
    percentage: number;
    color: string;
}

export default function CategoryProgress({
    label,
    value,
    percentage,
    color,
}: Props) {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="text-[var(--text)] text-sm">{label}</span>
                <span className="text-[var(--text)] text-sm">{value} itens</span>
            </div>

            <div className="h-2 rounded-full bg-[var(--surface-two)]">
                <div
                    className={`${color} h-full rounded-full`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}