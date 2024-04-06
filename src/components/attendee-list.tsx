import Dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { IconButton } from './icon-button';
import { TableComponent } from './table/table-component';
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { useState, useEffect, ChangeEvent } from 'react';
// import { attendees } from '../datas/attendees';

Dayjs.extend(RelativeTime);
Dayjs.locale('pt-br');

interface Attendee {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    checkedInAt: string | null;
}

export function AttendeeList() {
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());

        if(url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? '';
        }

        return '';
    });
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());

        if(url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'));
        }

        return 1;
    });

    const totalPage = Math.ceil(total / 10);

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?');

        url.searchParams.set('pageIndex', String(page - 1));

        if(search.length > 0){
            url.searchParams.set('query', search);
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAttendees(data.attendees);
                setTotal(data.total);
            })
    }, [page, search])

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString());

        url.searchParams.set('search', search);

        window.history.pushState({}, "", url);

        setSearch(search);
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());

        url.searchParams.set('page', String(page));

        window.history.pushState({}, "", url);

        setPage(page);
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setCurrentPage(1);
    }

    return(
        <>
            <div className="flex items-center gap-3 px-3 my-4">
                <h1 className="text-2xl font-bold">Participantes</h1>

                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-[#9FF9CC]" />
                    <input className="bg-transparent flex-1 border-none outline-none focus:ring-0" placeholder="Buscar Participante..." value={search} onChange={onSearchInputChanged} />
                </div>
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
                    {attendees.map((attendee) => {
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
                                <TableCell>
                                    {attendee.checkedInAt 
                                        ? <span className="text-zinc-400">Não fez check-in</span> 
                                        : Dayjs().to(attendee.checkedInAt)
                                    }
                                </TableCell>
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
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>

                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPage}</span>

                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => setCurrentPage(1)} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(page - 1)} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(page + 1)} disabled={page === totalPage}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setCurrentPage(totalPage)} disabled={page === totalPage}>
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
