import Button from 'components/ui/Button';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Category, getEmojisGroupedBy } from 'unicode-emoji';

const groupedEmojis = getEmojisGroupedBy('category', { versionAbove: '12.1' });
const categories = Object.keys(groupedEmojis) as Category[];

const localeCategoryNames: Record<Category, string> = {
  'face-emotion': 'Emociones',
  'food-drink': 'Comida',
  'animals-nature': 'Naturaleza',
  'activities-events': 'Actividades',
  'person-people': 'Personas',
  'travel-places': 'Lugares',
  objects: 'Objetos',
  symbols: 'Símbolos',
  flags: 'Banderas'
};

const categorySimbols: Record<Category, string> = {
  'face-emotion': '😀',
  'food-drink': '🍕',
  'animals-nature': '🐵',
  'activities-events': '🎈',
  'person-people': '👨',
  'travel-places': '🌍',
  objects: '💣',
  symbols: '❤',
  flags: '🏳'
};

const EmojiPicker = React.forwardRef<HTMLDivElement, EmojiPickerProps>(
  ({ onPick, className }, ref) => {
    const [category, setCategory] = useState<Category>('face-emotion');
    const emojis = groupedEmojis[category];
    const emojiContainerRef = useRef<HTMLDivElement>(null);

    return (
      <div
        className={twMerge(
          'flex flex-col grow max-w-sm max-h-80 border bg-white border-purple-400 shadow-sm p-3 rounded-md',
          className
        )}
        ref={ref}
      >
        <div className="flex gap-2 mb-2">
          {categories.map((cat) => (
            <Button
              variant="transparent-primary"
              className={twMerge('grow focus:ring-0', cat === category && 'bg-purple-500/30')}
              onClick={() => {
                setCategory(cat);
                emojiContainerRef.current?.scroll({ top: 0 });
              }}
              title={localeCategoryNames[cat]}
              key={cat}
              type="button"
            >
              {categorySimbols[cat]}
            </Button>
          ))}
        </div>

        <div className="overflow-auto px-2 border-t border-purple-500" ref={emojiContainerRef}>
          <div className="font-bold my-2" id={category}>
            {localeCategoryNames[category]}
          </div>

          <div key={category} className="grid grid-cols-auto gap-2">
            {emojis.map((emoji) => (
              <Button
                variant="transparent-primary"
                key={emoji.emoji}
                className="flex items justify-center"
                title={emoji.description}
                onClick={() => onPick(emoji.emoji)}
                type="button"
              >
                {emoji.emoji}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

EmojiPicker.displayName = 'EmojiPicker';

export default EmojiPicker;

interface EmojiPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onPick: (emoji: string) => void;
}
