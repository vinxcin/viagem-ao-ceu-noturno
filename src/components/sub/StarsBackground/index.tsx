type StarsProps = {
    length?: number; // opcional, com valor padrão
};

export default function StarsBackground({ length = 100 }: StarsProps) {
    return (
        <section className="absolute inset-0 z-0 pointer-events-none">
            {Array.from({ length }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                />
            ))}
        </section>
    );
}
