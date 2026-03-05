'use client';
import { useState } from 'react';
import Link from 'next/link';

const chapters = [
  {
    id: 'dsa',
    title: 'DSA (Data Structures & Algorithms)',
    icon: '📚',
    description: 'Comprehensive guide to data structures and algorithms',
    pages: [
      { name: 'Cheatsheet', path: '/dsa/cheatsheet', icon: '📋' },
    ],
  },
];

export default function HomePage() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>('dsa');

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      background: '#ffffff',
      color: '#1a1a1a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        background: '#f8f9fa',
        borderBottom: '2px solid #2563eb',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: 48,
          height: 48,
          background: '#2563eb',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 900,
          color: '#ffffff',
        }}>
          N
        </div>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            color: '#2563eb',
            letterSpacing: '-0.5px',
          }}>
            Notes
          </h1>
          <p style={{
            margin: '2px 0 0',
            fontSize: 12,
            color: '#6b7280',
            letterSpacing: '0.5px',
          }}>
            Study Guide & Reference
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '32px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            margin: '0 0 24px',
            fontSize: 20,
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: '-0.3px',
          }}>
            📖 Chapters
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                style={{
                  border: '1px solid #dbeafe',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                {/* Chapter Header */}
                <button
                  onClick={() =>
                    setExpandedChapter(
                      expandedChapter === chapter.id ? null : chapter.id
                    )
                  }
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: 'none',
                    background: expandedChapter === chapter.id ? '#eff6ff' : '#fafbfc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transitionAll: 'all 0.2s',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{chapter.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}>
                      {chapter.title}
                    </h3>
                    <p style={{
                      margin: '4px 0 0',
                      fontSize: 12,
                      color: '#6b7280',
                    }}>
                      {chapter.description}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      color: '#2563eb',
                      transition: 'transform 0.2s',
                      transform:
                        expandedChapter === chapter.id
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                    }}
                  >
                    ▼
                  </span>
                </button>

                {/* Pages List */}
                {expandedChapter === chapter.id && (
                  <div
                    style={{
                      borderTop: '1px solid #dbeafe',
                      padding: '0',
                      background: '#fafbfc',
                    }}
                  >
                    {chapter.pages.map((page, idx) => (
                      <Link
                        key={page.path}
                        href={page.path}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          style={{
                            padding: '12px 16px 12px 48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderBottom:
                              idx < chapter.pages.length - 1
                                ? '1px solid #e5e7eb'
                                : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            background: idx % 2 === 0 ? '#fafbfc' : '#f8f9fa',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              '#eff6ff';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              idx % 2 === 0 ? '#fafbfc' : '#f8f9fa';
                          }}
                        >
                          <span style={{ fontSize: 14 }}>{page.icon}</span>
                          <span
                            style={{
                              fontSize: 13,
                              color: '#2563eb',
                              fontWeight: 500,
                            }}
                          >
                            {page.name}
                          </span>
                          <span
                            style={{
                              marginLeft: 'auto',
                              fontSize: 12,
                              color: '#9ca3af',
                            }}
                          >
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          marginTop: '48px',
          padding: '20px',
          background: '#eff6ff',
          border: '1px solid #dbeafe',
          borderRadius: 8,
        }}>
          <p style={{
            margin: 0,
            fontSize: 12,
            color: '#1e40af',
            lineHeight: 1.6,
          }}>
            📝 {chapters.reduce((sum, c) => sum + c.pages.length, 0)} pages across{' '}
            {chapters.length} chapter{chapters.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
