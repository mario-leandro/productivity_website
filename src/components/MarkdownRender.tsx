import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Pencil, Pin, Star, Trash } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/Card";

export default function MarkdownRender({ content }: { content: string }) {
    return (
        <Card className="p-6">
            <CardHeader className="flex flex-row justify-between items-center">
              <h2 className="text-xl font-bold">Manual de uso do Syncro</h2>

              <div className="flex flex-row items-center gap-2">
                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Star size={16} />
                </button>

                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Pin size={16} />
                </button>

                <button
                  className="flex flex-row items-center text-xs gap-1 px-3 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)/60 transition-colors"
                  onClick={() => setEditar(!editar)}
                >
                  <Pencil size={16} />
                  {editar ? "Salvar" : "Editar"}
                </button>

                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Trash className="text-red-400" size={16} />
                </button>
              </div>
            </CardHeader>

            <hr className="text-(--surface-four) my-5" />

            <CardContent>
              {/* preview aqui */}
              <div className="mt-6 text-[var(--text)] text-base leading-relaxed">
                {editar ? (
                  <div className="bg-(--surface-three) border border-(--surface-four) rounded-xl flex flex-col gap-2 mt-6">
                    <textarea
                      className="w-full h-[500px] rounded-xl p-3 text-[var(--text)] text-base leading-relaxed focus:outline-none resize-none"
                      value={conteudo}
                      onChange={(e) => setConteudo(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="bg-(--surface-three) border border-(--surface-four) rounded-xl p-3">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-xl font-bold mb-6 text-[var(--text)]">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold mt-8 mb-3 text-[var(--primary)]">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-base font-semibold mt-6 mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-xs leading-6 mb-4 text-[var(--text-secundary)]">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-6 space-y-2 mb-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-6 space-y-2 mb-4">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[var(--text-secundary)] text-xs">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-[var(--text)] font-bold">
                            {children}
                          </strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic my-4">
                            {children}
                          </blockquote>
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {conteudo}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
    )
}