import { useState, useMemo } from 'react';
import { BookOpen, Search, ChevronRight, Calendar, User } from 'lucide-react';
import { knowledgeBase, knowledgeCategories } from '../data/knowledge';

function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // 过滤知识库内容
  const filteredKnowledge = useMemo(() => {
    let filtered = knowledgeBase;

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 按搜索关键词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          JSON.stringify(item.content).toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // 切换展开/收起
  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // 渲染内容
  const renderContent = (item) => {
    const { content } = item;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div className="space-y-4">
        {content.overview && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700 leading-relaxed">{content.overview}</p>
          </div>
        )}

        {content.steps && (
          <div className="space-y-4">
            {content.steps.map((step, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                    {step.details && (
                      <ul className="space-y-1.5 text-sm text-slate-700">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-teal-500 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {content.specialCases && (
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">特殊情况</h4>
            {content.specialCases.map((special, index) => (
              <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="font-semibold text-amber-900 mb-1">{special.type}</div>
                <p className="text-sm text-slate-700 mb-2">{special.description}</p>
                {special.example && (
                  <p className="text-xs text-slate-600 italic">例：{special.example}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {content.principles && (
          <div className="space-y-4">
            {content.principles.map((principle, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-2">{principle.condition}</h4>
                <p className="text-sm text-slate-700 mb-3">{principle.description}</p>
                {principle.examples && (
                  <div className="space-y-2">
                    {principle.examples.map((example, i) => (
                      <div key={i} className="bg-slate-50 rounded p-2 text-sm text-slate-700">
                        {example}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {content.methods && (
          <div className="space-y-4">
            {content.methods.map((method, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-2">{method.name}</h4>
                <p className="text-sm text-slate-700 mb-3">{method.description}</p>
                {method.tips && (
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {method.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {method.example && (
                  <div className="mt-3 bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r">
                    <p className="text-xs text-slate-700 italic">{method.example}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {content.generation && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-2">{content.generation.title}</h4>
            <p className="text-sm text-slate-600 mb-2">{content.generation.explanation}</p>
            {content.generation.cycle && (
              <div className="bg-slate-50 rounded p-3 mb-2">
                <p className="text-sm font-medium text-slate-900">{content.generation.cycle}</p>
              </div>
            )}
            {content.generation.order && (
              <div className="flex flex-wrap gap-2 mb-2">
                {content.generation.order.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            )}
            {content.generation.details && (
              <ul className="space-y-1.5 text-sm text-slate-700 mb-2">
                {content.generation.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            {content.generation.coreLogic && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mt-2">
                <p className="text-sm text-slate-700 font-medium">核心逻辑：{content.generation.coreLogic}</p>
              </div>
            )}
          </div>
        )}

        {content.restriction && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-2">{content.restriction.title}</h4>
            <p className="text-sm text-slate-600 mb-2">{content.restriction.explanation}</p>
            {content.restriction.cycle && (
              <div className="bg-slate-50 rounded p-3 mb-2">
                <p className="text-sm font-medium text-slate-900">{content.restriction.cycle}</p>
              </div>
            )}
            {content.restriction.order && (
              <div className="flex flex-wrap gap-2 mb-2">
                {content.restriction.order.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            )}
            {content.restriction.details && (
              <ul className="space-y-1.5 text-sm text-slate-700 mb-2">
                {content.restriction.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            {content.restriction.coreLogic && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r mt-2">
                <p className="text-sm text-slate-700 font-medium">核心逻辑：{content.restriction.coreLogic}</p>
              </div>
            )}
          </div>
        )}

        {content.tiangan && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.tiangan.title}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {content.tiangan.list.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
            {content.tiangan.wuxing && (
              <div className="space-y-2 text-sm">
                <div><strong>五行分类：</strong></div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(content.tiangan.wuxing).map(([element, items]) => (
                    <div key={element} className="bg-slate-50 rounded p-2">
                      <span className="font-medium">{element === 'wood' ? '木' : element === 'fire' ? '火' : element === 'earth' ? '土' : element === 'metal' ? '金' : '水'}：</span>
                      <span>{items.join('、')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {content.dizhi && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhi.title}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {content.dizhi.list && content.dizhi.list.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
            {content.dizhi.items && (
              <div className="grid grid-cols-2 gap-2">
                {content.dizhi.items.map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                    <span className="font-bold text-purple-700">{item.dizhi}</span>
                    <span className="text-slate-600 ml-2">{item.element}</span>
                    <div className="text-xs text-slate-500 mt-1">{item.image}｜{item.body}</div>
                  </div>
                ))}
              </div>
            )}
            {content.dizhi.wuxing && (
              <div className="space-y-2 text-sm mt-4">
                <div><strong>五行分类：</strong></div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(content.dizhi.wuxing).map(([element, items]) => (
                    <div key={element} className="bg-slate-50 rounded p-2">
                      <span className="font-medium">{element === 'wood' ? '木' : element === 'fire' ? '火' : element === 'earth' ? '土' : element === 'metal' ? '金' : '水'}：</span>
                      <span>{items.join('、')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {content.seasonDirection && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.seasonDirection.title}</h4>
            <div className="space-y-2 mb-3">
              {content.seasonDirection.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-3 text-sm">
                  <div className="font-semibold text-slate-900">{item.season}</div>
                  <div className="text-slate-600 mt-1">
                    {item.tiangan} / {item.dizhi} → {item.direction}{item.element}
                  </div>
                </div>
              ))}
            </div>
            {content.seasonDirection.mnemonic && (
              <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r">
                <p className="text-sm text-slate-700 whitespace-pre-line font-medium">
                  {content.seasonDirection.mnemonic}
                </p>
              </div>
            )}
          </div>
        )}

        {content.items && content.items[0] && content.items[0].images && (
          <div className="space-y-4">
            {content.items.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-900 mb-3">{item.name}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">物象：</div>
                    <div className="text-slate-600">{item.images.object.join('、')}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">事象：</div>
                    <div className="text-slate-600">{item.images.event.join('、')}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">人象：</div>
                    <div className="text-slate-600">{item.images.person.join('、')}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 mb-1">身体：</div>
                    <div className="text-slate-600">{item.images.body.join('、')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {content.structure && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.structure.title}</h4>
            <div className="space-y-2 mb-3">
              {content.structure.columns.map((col, i) => (
                <div key={i} className={`bg-slate-50 rounded p-3 ${col.highlight ? 'ring-2 ring-teal-500 bg-teal-50' : ''}`}>
                  <div className="font-semibold text-slate-900">{col.name}</div>
                  <div className="text-sm text-slate-600 mt-1">{col.description}</div>
                </div>
              ))}
            </div>
            {content.structure.core && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                <p className="text-sm text-slate-700 font-medium">{content.structure.core}</p>
              </div>
            )}
          </div>
        )}

        {content.tianganHe && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.tianganHe.title}</h4>
            <div className="space-y-2 mb-3">
              {content.tianganHe.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                  <span className="font-medium">{item.combination}</span>
                  <span className="text-slate-600 ml-2">→ {item.result}</span>
                </div>
              ))}
            </div>
            {content.tianganHe.mnemonic && (
              <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r">
                <p className="text-sm text-slate-700 whitespace-pre-line font-medium">
                  {content.tianganHe.mnemonic}
                </p>
              </div>
            )}
          </div>
        )}

        {content.tianganChong && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.tianganChong.title}</h4>
            <div className="flex flex-wrap gap-2">
              {content.tianganChong.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {content.dizhiHe && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhiHe.title}</h4>
            <div className="grid grid-cols-2 gap-2">
              {content.dizhiHe.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                  <span className="font-medium">{item.combination}</span>
                  <span className="text-slate-600 ml-2">{item.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.dizhiSanHe && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhiSanHe.title}</h4>
            <div className="space-y-2">
              {content.dizhiSanHe.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                  <span className="font-medium">{item.combination}</span>
                  <span className="text-slate-600 ml-2">→ {item.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.dizhiChong && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhiChong.title}</h4>
            <div className="flex flex-wrap gap-2">
              {content.dizhiChong.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {content.dizhiHai && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhiHai.title}</h4>
            <div className="flex flex-wrap gap-2">
              {content.dizhiHai.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {content.dizhiXing && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.dizhiXing.title}</h4>
            <div className="space-y-2">
              {content.dizhiXing.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                  <span className="font-medium text-amber-700">{item.type}：</span>
                  <span className="text-slate-700 ml-2">{item.combination}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.steps && content.steps[0] && content.steps[0].weight && (
          <div className="space-y-4">
            {content.steps.map((step, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{step.title}</h4>
                      {step.weight && (
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                          {step.weight}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                    {step.details && (
                      <ul className="space-y-1.5 text-sm text-slate-700">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-teal-500 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.results && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {step.results.map((result, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {result}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {content.corePrinciple && (
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-500 rounded-lg p-4 mb-4">
            <div className="font-bold text-teal-900 text-lg mb-2">核心原则</div>
            <p className="text-slate-700 font-medium">{content.corePrinciple}</p>
          </div>
        )}

        {content.seasonPriority && (
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-bold text-slate-900 mb-3">{content.seasonPriority.title}</h4>
            <div className="grid grid-cols-2 gap-2">
              {content.seasonPriority.items.map((item, i) => (
                <div key={i} className="bg-slate-50 rounded p-2 text-sm">
                  <span className="font-medium">{item.season}：</span>
                  <span className="text-slate-700">{item.favorable}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.positioning && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-500 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 text-lg mb-2">{content.positioning.title}</h4>
            <p className="text-slate-700 font-medium mb-3">{content.positioning.description}</p>
            {content.positioning.features && (
              <div className="space-y-2 mb-3">
                <div className="font-semibold text-slate-900 text-sm">功能特点：</div>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {content.positioning.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.positioning.notThis && (
              <div className="space-y-2">
                <div className="font-semibold text-slate-900 text-sm">不是：</div>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {content.positioning.notThis.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {content.generation && content.generation.coreLogic && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mt-4">
            <p className="text-sm text-slate-700 font-medium">核心逻辑：{content.generation.coreLogic}</p>
          </div>
        )}

        {content.restriction && content.restriction.coreLogic && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r mt-4">
            <p className="text-sm text-slate-700 font-medium">核心逻辑：{content.restriction.coreLogic}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 头部 */}
      <header className="bg-white border-b border-slate-200 px-6 pt-4 pb-6 sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">知识库</h1>
        
        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索知识库..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {knowledgeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* 内容列表 */}
      <main className="px-6 py-6 pb-24">
        {filteredKnowledge.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">没有找到相关内容</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredKnowledge.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    {item.author && (
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {item.author}
                        </span>
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {item.date}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <ChevronRight
                    size={20}
                    className={`text-slate-400 transition-transform flex-shrink-0 ${
                      expandedItems.has(item.id) ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {expandedItems.has(item.id) && (
                  <div className="px-4 pb-4 border-t border-slate-100">
                    {renderContent(item)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default KnowledgeBase;

