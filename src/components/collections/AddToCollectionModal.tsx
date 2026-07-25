import { useState } from 'react';
import { X, FolderOpen, Plus, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/cn';

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueTitle: string;
  publisher: string;
  year: string;
  coverImage: string;
}

const mockCollections = [
  { id: 1, name: 'Batman Completo', count: 42 },
  { id: 2, name: 'Para Ler em 2026', count: 12 },
  { id: 3, name: 'Clássicos Marvel', count: 88 },
];

const statusOptions = [
  { value: 'wishlist', label: 'Quero Ler' },
  { value: 'reading', label: 'Lendo' },
  { value: 'read', label: 'Lido' },
  { value: 'abandoned', label: 'Abandonado' },
];

export function AddToCollectionModal({
  isOpen,
  onClose,
  issueTitle,
  publisher,
  year,
  coverImage,
}: AddToCollectionModalProps) {
  const [selectedCollection, setSelectedCollection] = useState(mockCollections[0].id);
  const [selectedStatus, setSelectedStatus] = useState('reading');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [note, setNote] = useState('');

  const handleAdd = () => {
    // TODO: Implement API call
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-xl bg-surface border border-outline-variant shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] flex flex-col md:flex-row">
        {/* Left Side - Issue Info */}
        <div className="md:w-1/3 bg-surface-container-high p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden border-r border-outline-variant">
          <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] text-primary/5 opacity-20" />
          <div className="relative z-10 w-40 h-45 rounded-lg shadow-xl overflow-hidden">
            <img 
              src={coverImage} 
              alt={issueTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center z-10">
            <h3 className="font-label-heroic text-label-heroic text-primary uppercase tracking-tight">
              {issueTitle}
            </h3>
            <p className="text-label-sm text-on-surface-variant">{publisher}, {year}</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-2/3 p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex justify-between items-start">
            <DialogTitle className="font-headline-md text-headline-md text-primary">
              Adicionar à Coleção
            </DialogTitle>
            <DialogClose className="text-on-surface-variant hover:text-secondary transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>

          {/* Select Collection */}
          <div className="space-y-2">
            <Label className="font-label-heroic text-label-heroic text-primary uppercase flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Selecionar Coleção
            </Label>
            <RadioGroup 
              value={String(selectedCollection)} 
              onValueChange={(v) => setSelectedCollection(Number(v))}
              className="space-y-1"
            >
              {mockCollections.map((collection) => (
                <div 
                  key={collection.id}
                  className={cn(
                    'flex items-center p-2 rounded-lg border border-outline-variant bg-surface-container-low cursor-pointer hover:border-secondary-container transition-colors',
                    selectedCollection === collection.id && 'border-secondary-container bg-secondary/5'
                  )}
                >
                  <RadioGroupItem value={String(collection.id)} id={`collection-${collection.id}`} />
                  <Label htmlFor={`collection-${collection.id}`} className="ml-3 text-body-md font-medium cursor-pointer flex-1">
                    {collection.name}
                  </Label>
                  <span className="text-label-sm text-on-surface-variant">{collection.count} itens</span>
                </div>
              ))}
            </RadioGroup>
            <Button variant="ghost" className="text-secondary font-label-heroic text-label-heroic hover:underline px-0">
              <Plus className="h-4 w-4" />
              Criar Nova Coleção
            </Button>
          </div>

          {/* Reading Status */}
          <div className="space-y-2">
            <Label className="font-label-heroic text-label-heroic text-primary uppercase flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Status de Leitura
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((status) => (
                <Button
                  key={status.value}
                  variant={selectedStatus === status.value ? 'default' : 'outline'}
                  className={cn(
                    'px-4 py-1.5 rounded-full font-label-heroic text-label-heroic transition-all',
                    selectedStatus === status.value 
                      ? 'bg-secondary text-on-primary border-secondary shadow-sm' 
                      : 'border-outline-variant text-on-surface-variant hover:border-secondary-container hover:text-secondary-container'
                  )}
                  onClick={() => setSelectedStatus(status.value)}
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating & Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-label-heroic text-label-heroic text-primary uppercase flex items-center gap-2">
                <Star className="h-4 w-4" />
                Avaliação
              </Label>
              <div 
                className="flex gap-1"
                onMouseLeave={() => setHoveredRating(0)}
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const isFilled = hoveredRating > 0 ? i < hoveredRating : i < rating;
                  return (
                    <Star
                      key={i}
                      className={cn(
                        'h-8 w-8 cursor-pointer transition-colors',
                        isFilled ? 'fill-tertiary-fixed-dim text-tertiary-fixed-dim' : 'text-outline-variant'
                      )}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoveredRating(i + 1)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-label-heroic text-label-heroic text-primary uppercase">
                Nota Pessoal
              </Label>
              <Textarea
                placeholder="O que achou desta edição?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-20 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
            <Button variant="ghost" onClick={onClose} className="text-label-heroic text-on-surface-variant hover:text-primary">
              Cancelar
            </Button>
            <Button onClick={handleAdd} className="bg-secondary text-on-primary font-label-heroic px-6 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
