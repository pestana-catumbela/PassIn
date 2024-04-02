import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { IconButton } from './icon-button';

export function AttendeeList() {
    return(
        <>
            <div className="flex items-center gap-3 px-3 my-4">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-[#9FF9CC]" />
                    <input className="bg-transparent flex-1 border-none outline-none" placeholder="Buscar Participante..." />
                </div>
            </div>
 
            <div className="mx-3 border border-white/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th style={{width: 48}} className="py-3 px-4 text-sm font-semibold text-left">
                                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Código</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Participante</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Data de Inscrição</th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">Data Check-in</th>
                            <th style={{width: 64}} className="py-3 px-4 text-sm font-semibold text-left"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 10 }).map((_, i) => {
                            return(
                                <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">
                                        <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">128381</td>
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-[#FFFFFF]">Pestana Pedro Catumbela</span>
                                            <span>pestannapedrocatumbella@gmail.com</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">7 dias atrás</td>
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">3 dias atrás</td>
                                    <td className="py-3 px-4 text-sm text-[#C4C4CC]">
                                        <IconButton transparent>
                                            <MoreHorizontal className="size-4" />
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td className="py-3 px-4 text-sm text-[#C4C4CC]" colSpan={3}>
                                Mostrando 10 de 228
                            </td>
                            <td className="py-3 px-4 text-sm text-[#C4C4CC] text-right" colSpan={3}>
                                <div className="inline-flex items-center gap-8">
                                    <span>Página 1 de 23</span>

                                    <div className="flex gap-1.5">
                                        <IconButton>
                                            <ChevronsLeft className="size-4" />
                                        </IconButton>
                                        <IconButton>
                                            <ChevronLeft className="size-4" />
                                        </IconButton>
                                        <IconButton>
                                            <ChevronRight className="size-4" />
                                        </IconButton>
                                        <IconButton>
                                            <ChevronsRight className="size-4" />
                                        </IconButton>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}
