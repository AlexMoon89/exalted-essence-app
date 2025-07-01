'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { WikiEntry } from '@/lib/wikiData';
import type { Technique } from '@/lib/wikiData';

type WikiEntryModalProps = {
  entry: WikiEntry;
  onClose: () => void;
};

export default function WikiEntryModal({ entry, onClose }: WikiEntryModalProps) {
  // ✅ Escape key handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <div className="bg-background dark:bg-dark-background rounded-lg shadow-xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-aura-solar">{entry.name}</h2>

          {/* Martial Arts Style Details */}
          {entry.category === "Martial Arts" && (
            <div className="mb-4">
              {entry.full?.armor && (
                <p className="text-sm text-gray-400"><strong>Armor:</strong> {entry.full.armor}</p>
              )}
              {entry.full?.weaponTags && Array.isArray(entry.full.weaponTags) && entry.full.weaponTags.length > 0 && (
                <p className="text-sm text-gray-400"><strong>Weapon Tags:</strong> {entry.full.weaponTags.join(', ')}</p>
              )}
            </div>
          )}

          <div className="text-sm text-gray-400 space-y-1">
            <p><strong>Category:</strong> {entry.category}</p>
            {entry.ability && <p><strong>Ability:</strong> {entry.ability}</p>}
            {entry.essenceCost && <p><strong>Essence Cost:</strong> {entry.essenceCost}</p>}
            {entry.mode && <p><strong>Mode:</strong> {entry.mode}</p>}
            {entry.sourcebook && (
              <p><strong>Source:</strong> {entry.sourcebook} ({entry.pageRef})</p>
            )}
          </div>

          <p className="text-gray-300 text-lg">{entry.description}</p>

          {/* Martial Arts Techniques Display */}
          {entry.category === "Martial Arts" && (entry.full?.techniques?.length ?? 0) > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mt-6 mb-2 text-aura-lunar">Techniques</h3>
              <div className="grid gap-4">
                {entry.full?.techniques?.map((tech, idx) => (
                  <div key={tech.name} className="bg-aura-lunar/10 border border-aura-lunar rounded-lg p-4">
                    <div className="font-bold text-lg mb-1">{tech.name}</div>
                    {tech.prerequisites && (
                      <div className="text-sm italic text-steel mb-1">{tech.prerequisites}</div>
                    )}
                    <div className="mb-2">{tech.description}</div>
                    {(tech.modes?.length ?? 0) > 0 && (
                      <div className="pl-2">
                        <strong>Modes:</strong>
                        <ul className="list-disc list-inside space-y-1">
                          {tech.modes?.map((mode, i) => (
                            <li key={i}>
                              <strong>{mode.name}:</strong> {mode.effect}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {entry.tags.length > 0 && (
            <div>
              <strong className="text-sm text-gray-400">Tags:</strong>
              <div className="mt-1 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-aura-lunar/20 text-aura-lunar px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

