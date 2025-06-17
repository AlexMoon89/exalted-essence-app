'use client';

import { useState, useEffect } from 'react';
import { Sparkle, Sparkles, X } from 'lucide-react';
import { wikiEntries, type WikiEntry } from '@/lib/wikiData';

const categories = ['Charms', 'Martial Arts', 'Spells', 'Merits', 'Artifacts', 'Resources'];

export default function WikiPage() {
  const [selectedCategory, setSelectedCategory] = useState('Charms');
  const [searchQuery, setSearchQuery] = useState('');
  const [openEntry, setOpenEntry] = useState<WikiEntry | null>(null);

  const filteredEntries = wikiEntries
    .filter((entry) => entry.category === selectedCategory)
    .filter((entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3 bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">
        <Sparkle className="w-10 h-10 text-aura-solar" />
        All Encompassing Essence Wiki
        <Sparkles className="w-10 h-10 text-aura-solar" />
      </h1>

      <div className="flex flex-wrap gap-4 justify-center bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat
                ? 'bg-ice text-steel font-semibold'
                : 'hover:bg-ice hover:text-aura-lunar dark:hover:bg-dark-steel dark:hover:text-dark-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full md:w-1/2 px-4 py-2 rounded-md bg-background border border-border text-foreground dark:bg-dark-background dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-aura-solar transition-colors"
        />
        <p className="text-lg text-aura-abyssal text-center mt-6">
          Showing <strong>{selectedCategory}</strong> matching “{searchQuery}”
        </p>
      </div>

      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {filteredEntries.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No entries found for this search.
            </div>
          )}
          {filteredEntries.map((entry) => (
            <div
              key={entry.slug}
              onClick={() => setOpenEntry(entry)}
              className="cursor-pointer bg-steel/30 p-4 rounded-lg shadow hover:bg-steel/50 transition"
            >
              <h3 className="text-xl text-aura-solar font-semibold">{entry.name}</h3>
              <p className="text-sm text-aura-abyssal">{entry.description}</p>
              <p className="text-xs mt-2 text-gray-400">Tags: {entry.tags.join(', ')}</p>
              <p className="text-xs text-gray-500">
                Source: {entry.sourcebook} – {entry.pageRef}
              </p>
            </div>
          ))}
        </div>
      </div>

      {openEntry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <div className="bg-background dark:bg-dark-background rounded-lg shadow-xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setOpenEntry(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold text-aura-solar">{openEntry.name}</h2>

              <div className="text-sm text-gray-400 space-y-1">
                <p><strong>Category:</strong> {openEntry.category}</p>
                {openEntry.ability && <p><strong>Ability:</strong> {openEntry.ability}</p>}
                {openEntry.essenceCost && <p><strong>Essence Cost:</strong> {openEntry.essenceCost}</p>}
                {openEntry.mode && <p><strong>Mode:</strong> {openEntry.mode}</p>}
                {openEntry.sourcebook && (
                  <p><strong>Source:</strong> {openEntry.sourcebook} ({openEntry.pageRef})</p>
                )}
              </div>

              <p className="text-gray-300 text-lg">{openEntry.description}</p>

              {openEntry.tags.length > 0 && (
                <div>
                  <strong className="text-sm text-gray-400">Tags:</strong>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {openEntry.tags.map((tag) => (
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
      )}
    </div>
  );
}
