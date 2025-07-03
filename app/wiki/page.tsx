'use client';

import { useState, useEffect } from 'react';
import { Sparkle, Sparkles, X } from 'lucide-react';
import {
  loadAllCharmsAsWikiEntries,
  loadAllMartialArtsAsWikiEntries,
  loadAllSpellsAsWikiEntries,
  loadAllShapingRitualsAsWikiEntries,
  loadAllMeritsAsWikiEntries,
  type WikiEntry,
  type Technique
} from '@/lib/wikiData';

const categories = ['Charms', 'Martial Arts', 'Spells', 'Merits', 'Artifacts', 'Resources'];
const exaltTypes = ['Solar', 'Lunar', 'Abyssal', 'Alchemical', 'Dragon Blooded', 'Sidereal', 'Infernal', 'Getimian', 'Universal'];
const spellCategories = ["Shaping Ritual", "Universal", "Sorcery", "Necromancy"];
const spellCircles = ["First Circle", "Second Circle", "Third Circle"];

export default function WikiPage() {
  const [selectedCategory, setSelectedCategory] = useState('Charms');
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [selectedExaltType, setSelectedExaltType] = useState<string | null>(null);
  const [selectedCharmCategory, setSelectedCharmCategory] = useState<string | null>(null);
  const [selectedSpellCategory, setSelectedSpellCategory] = useState<string | null>(null);
  const [selectedSpellCircle, setSelectedSpellCircle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openEntry, setOpenEntry] = useState<WikiEntry | null>(null);
  const [entries, setEntries] = useState<WikiEntry[]>([]);

    useEffect(() => {
    async function loadData() {
      if (selectedCategory === 'Charms') {
        const charms = await loadAllCharmsAsWikiEntries();
        setEntries(charms);
      } else if (selectedCategory === 'Martial Arts') {
        const martialArts = await loadAllMartialArtsAsWikiEntries();
        setEntries(martialArts);
      } else if (selectedCategory === 'Spells') {
        const spells = await loadAllSpellsAsWikiEntries();
        const rituals = await loadAllShapingRitualsAsWikiEntries();

        // Ensure all entries have category 'Spell' and proper tags
        const allSpells = [...spells, ...rituals].map(entry => {
          // Force all entries to category 'Spell'
          let tags = Array.isArray(entry.tags) ? entry.tags : [];
          // Add 'Shaping Ritual' to rituals
          if (entry.name && rituals.find(r => r.name === entry.name)) {
            if (!tags.includes('Shaping Ritual')) tags = ['Shaping Ritual', ...tags];
          }
          return { ...entry, category: 'Spell', tags };
        });

        // Deduplicate by slug (spell names must be unique in your data)
        const uniqueEntries = Array.from(new Map(allSpells.map(e => [e.slug, e])).values());
        setEntries(uniqueEntries);
      } else if (selectedCategory === 'Merits') {
        const merits = await loadAllMeritsAsWikiEntries();
        setEntries(merits);
      } else {
        setEntries([]);
      }
      // Reset filters when changing main tab
      setSelectedAbility(null);
      setSelectedExaltType(null);
      setSelectedCharmCategory(null);
      setSelectedSpellCategory(null);
      setSelectedSpellCircle(null);
      setSearchQuery('');
    }
    loadData();
  }, [selectedCategory]);

  // --- FILTER SETUP ---
  const allAbilities = Array.from(
    new Set(entries.flatMap((entry) => entry.ability?.split(',').map((a) => a.trim()) || []))
  ).sort();

  const allCharmCategories = Array.from(
    new Set(entries.map((entry) => entry.category))
  ).sort();

  const allSpellCategories = Array.from(
    new Set(
      entries
        .filter((entry) => entry.category === 'Spell')
        .flatMap((entry) => (entry.tags || []).filter((tag) => spellCategories.includes(tag)))
    )
  ).sort();

  const allSpellCircles = Array.from(
    new Set(
      entries
        .filter((entry) => entry.category === 'Spell')
        .map((entry) => entry.circle)
        .filter(Boolean)
    )
  ).sort();

  // --- MAIN FILTERED ENTRIES ---
  const filteredEntries = entries
    .filter((entry) => {
      if (!entry.category) return false;
      if (selectedCategory === 'Charms') return entry.category && entry.category.toLowerCase().includes('charm');
      if (selectedCategory === 'Artifacts') return entry.category === 'Artifact';
      if (selectedCategory === 'Resources') return entry.category === 'Resource';
      if (selectedCategory === 'Merits') {
        return entry.category === 'Merit' || entry.category === 'Merits';
      }
      if (selectedCategory === 'Martial Arts') return entry.category === 'Martial Arts';
      if (selectedCategory === 'Spells') return entry.category === 'Spell'; // STRICT match 
      return entry.category === selectedCategory;
    })
    .filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // CHARMS: ability/exalt/category
    .filter((entry) => {
      if (selectedCategory === 'Charms') {
        if (selectedAbility && !entry.ability?.includes(selectedAbility)) return false;
        if (selectedExaltType && !entry.tags.includes(selectedExaltType)) return false;
        if (selectedCharmCategory && entry.category !== selectedCharmCategory) return false;
      }
      return true;
    })
    // SPELLS: spellCategory/circle
    .filter((entry) => {
      if (selectedCategory === 'Spells') {
        if (selectedSpellCategory && !(entry.tags || []).includes(selectedSpellCategory)) return false;
        if (selectedSpellCircle && entry.circle !== selectedSpellCircle) return false;
      }
      return true;
    });

  // --- UI ---
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-aura-abyssal dark:text-dark-foreground">
      <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3 bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">
        <Sparkle className="w-10 h-10 text-gray-400" />
        All Encompassing Essence Wiki
        <Sparkles className="w-10 h-10 text-gray-400" />
      </h1>

      {/* Category Tabs */}
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

      {/* Filters */}
      {selectedCategory === 'Charms' && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <select
            value={selectedAbility || ''}
            onChange={(e) => setSelectedAbility(e.target.value || null)}
            className="border border-steel bg-gray-200 text-steel font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-lunar"
          >
            <option value="">All Abilities</option>
            {allAbilities.map((ability) => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
          </select>
          <select
            value={selectedExaltType || ''}
            onChange={(e) => setSelectedExaltType(e.target.value || null)}
            className="border border-steel bg-gray-200 text-steel font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-lunar"
          >
            <option value="">All Exalt Types</option>
            {exaltTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={selectedCharmCategory || ''}
            onChange={(e) => setSelectedCharmCategory(e.target.value || null)}
            className="border border-steel bg-gray-200 text-steel font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-lunar"
          >
            <option value="">All Charm Categories</option>
            {allCharmCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCategory === 'Spells' && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <select
            value={selectedSpellCategory || ''}
            onChange={(e) => setSelectedSpellCategory(e.target.value || null)}
            className="border border-steel bg-gray-200 text-steel font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-lunar"
          >
            <option value="">All Spell Categories</option>
            {allSpellCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedSpellCircle || ''}
            onChange={(e) => setSelectedSpellCircle(e.target.value || null)}
            className="border border-steel bg-gray-200 text-steel font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-aura-lunar"
          >
            <option value="">All Circles</option>
            {allSpellCircles.map((circle) => (
              <option key={circle} value={circle}>{circle}</option>
            ))}
          </select>
        </div>
      )}

      {/* Search Bar */}
      <div className="text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full md:w-1/2 px-4 py-2 rounded-md bg-background border border-border text-foreground dark:bg-dark-background dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-aura-lunar"
        />
        <p className="text-lg text-aura-abyssal text-center mt-6">
          Showing <strong>{selectedCategory}</strong> matching “{searchQuery}”
        </p>
      </div>

      {/* Grid of Entries */}
      <div className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
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
              <h3 className="text-xl bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text font-semibold">{entry.name}</h3>
              <p className="text-sm text-aura-abyssal line-clamp-3">{entry.description}</p>
              <p className="text-xs mt-2 text-aura-lunar">
                Tags: {Array.isArray(entry.tags) ? entry.tags.join(', ') : ''}
              </p>
              {entry.category === "Martial Arts" && entry.full?.complementaryAbilities && Array.isArray(entry.full.complementaryAbilities) && entry.full.complementaryAbilities.length > 0 ? (
                <p className="text-xs text-steel">
                  Complementary Abilities: {entry.full.complementaryAbilities.join(', ')}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Source: {entry.sourcebook} – {entry.pageRef}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">{openEntry.name}</h2>
              {/* Martial Arts Style Details */}
              {openEntry.category === "Martial Arts" && (
                <div className="mb-4">
                  {openEntry.full?.armor && (
                    <p className="text-sm text-aura-lunar"><strong>Armor:</strong> {openEntry.full.armor}</p>
                  )}
                  {openEntry.full?.weaponTags && Array.isArray(openEntry.full.weaponTags) && openEntry.full.weaponTags.length > 0 && (
                    <p className="text-sm text-aura-lunar"><strong>Weapon Tags:</strong> {openEntry.full.weaponTags.join(', ')}</p>
                  )}
                </div>
              )}
              <div className="text-sm text-steel space-y-1">
                <p><strong>Category:</strong> {openEntry.category}</p>
                {openEntry.ability && <p><strong>Ability:</strong> {openEntry.ability}</p>}
                {openEntry.full?.prerequisites && <p><strong>Prerequisites:</strong> {openEntry.full?.prerequisites}</p>}
                {openEntry.essenceCost && <p><strong>Essence Cost:</strong> {openEntry.essenceCost}</p>}
                {openEntry.mode && <p><strong>Mode:</strong> {openEntry.mode}</p>}
                {openEntry.category === "Martial Arts" && openEntry.full?.complementaryAbilities && Array.isArray(openEntry.full.complementaryAbilities) && openEntry.full.complementaryAbilities.length > 0 ? (
                  <p><strong>Complementary Abilities:</strong> {openEntry.full.complementaryAbilities.join(', ')}</p>
                ) : (
                  openEntry.sourcebook && (
                    <p><strong>Source:</strong> {openEntry.sourcebook} ({openEntry.pageRef})</p>
                  )
                )}
              </div>

              <div className="space-y-4 text-aura-abyssal">
                <p>{openEntry.description}</p>
                {/* Martial Arts Techniques Display */}
                {openEntry.category === "Martial Arts" && (openEntry.full?.techniques?.length ?? 0) > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-aura-lunar">Techniques</h3>
                    <div className="grid gap-4">
                      {openEntry.full?.techniques?.map((tech, idx) => (
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
                {/* End Martial Arts Techniques Display */}

                {/* --- MODES, for Merits and anything else --- */}
                {(openEntry.full?.modes?.length ?? 0) > 0 && (
                  <div>
                    <strong className="bg-gradient-to-r from-steel to-aura-lunar text-transparent bg-clip-text">Modes:</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-aura-abyssal">
                      {openEntry.full?.modes?.map((mode, i) => (
                        <li key={i}>
                          <strong>
                            {mode.name}
                            {mode.title ? ` – ${mode.title}` : ''}
                          :</strong> {mode.effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {openEntry.tags.length > 0 && (
                <div>
                  <strong className="text-sm text-steel">Tags:</strong>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {openEntry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-ice text-aura-lunar font-semibold px-2 py-1 rounded-full text-xs"
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
