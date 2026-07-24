interface ReadingItem {
  title: string;
  progress: number;
}

interface ReadingProgressWidgetProps {
  readings: ReadingItem[];
}

export function ReadingProgressWidget({ readings }: ReadingProgressWidgetProps) {
  if (!readings || readings.length === 0) {
    return (
      <div className="bg-primary text-on-primary p-6 rounded-xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: '8px 8px',
            }}
          />
        </div>
        <h3 className="text-label-heroic font-label-heroic uppercase tracking-[0.2em] relative">
          Progresso de Leitura
        </h3>
        <p className="text-on-primary/70 text-sm relative">
          Nenhuma leitura ativa no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary text-on-primary p-6 rounded-xl shadow-xl space-y-4 relative overflow-hidden">
      {/* Halftone background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}
        />
      </div>

      <h3 className="text-label-heroic font-label-heroic uppercase tracking-[0.2em] relative">
        Progresso de Leitura
      </h3>

      <div className="space-y-4 relative">
        {readings.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-label-sm mb-1">
              <span>{item.title}</span>
              <span className="font-bold">{item.progress}%</span>
            </div>
            <div className="h-2 w-full bg-on-primary/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary-container rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
