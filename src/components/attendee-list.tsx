import Dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { IconButton } from './icon-button';
import { TableComponent } from './table/table-component';
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { useState } from 'react';
import { attendees } from '../datas/attendees';

Dayjs.extend(RelativeTime);
Dayjs.locale('pt-br');

export function AttendeeList() {
    const totalPage = Math.ceil(attendees.length / 10);
    const [state, setState] = useState("");
    const [page, setPage] = useState(1);

    return(
        <>
            <div className="flex items-center gap-3 px-3 my-4">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-[#9FF9CC]" />
                    <input className="bg-transparent flex-1 border-none outline-none" placeholder="Buscar Participante..." onChange={(e) => setState(e.target.value)} />
                </div>
                {state}
            </div>
 
            <TableComponent>
                <thead>
                    <TableRow>
                        <TableHeader style={{width: 48}}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de Inscrição</TableHeader>
                        <TableHeader>Data Check-in</TableHeader>
                        <TableHeader style={{width: 64}}></TableHeader>
                    </TableRow>
                </thead>

                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return(
                            <TableRow key={attendee.id} className="hover:bg-white/5">
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-[#FFFFFF]">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{Dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{Dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>

                <tfoot>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>

                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPage}</span>

                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setPage(page + 1)} disabled={page === totalPage}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setPage(totalPage)} disabled={page === totalPage}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </TableComponent>
        </>
    )
}
