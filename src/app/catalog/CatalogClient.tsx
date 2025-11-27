'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCatalog, getGenres } from '@/lib/api';
import { ContentGrid } from '@/components/content/ContentGrid';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { SkeletonGrid } from '@/components/content/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { ContentItem, PaginationInfo, Genre } from '@/lib/types';
import { Filter, X } from 'lucide-react';

export default function CatalogClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [items, setItems] = useState<ContentItem[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [title, setTitle] = useState(searchParams.get('title') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [order, setOrder] = useState(searchParams.get('order') || 'latest');
    const [selectedGenres, setSelectedGenres] = useState<string[]>(
        searchParams.getAll('genre') || []
    );

    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        // Fetch available genres
        getGenres().then(data => {
            if (data) setGenres(data);
        });
    }, []);

    useEffect(() => {
        const fetchCatalog = async () => {
            setLoading(true);
            const filters = {
                title,
                status,
                type,
                order,
                genre: selectedGenres
            };

            const data = await getCatalog(page, filters);
            if (data) {
                setItems(data.data);
                setPagination(data.pagination);
            }
            setLoading(false);
        };

        fetchCatalog();
    }, [page, title, status, type, order, selectedGenres]);

    const updateFilters = (newFilters: any) => {
        const params = new URLSearchParams(searchParams.toString());

        // Update params
        if (newFilters.title !== undefined) {
            if (newFilters.title) params.set('title', newFilters.title);
            else params.delete('title');
            setTitle(newFilters.title || '');
        }

        if (newFilters.status !== undefined) {
            if (newFilters.status) params.set('status', newFilters.status);
            else params.delete('status');
            setStatus(newFilters.status || '');
        }

        if (newFilters.type !== undefined) {
            if (newFilters.type) params.set('type', newFilters.type);
            else params.delete('type');
            setType(newFilters.type || '');
        }

        if (newFilters.order !== undefined) {
            if (newFilters.order) params.set('order', newFilters.order);
            else params.delete('order');
            setOrder(newFilters.order || 'latest');
        }

        if (newFilters.genre !== undefined) {
            params.delete('genre');
            newFilters.genre.forEach((g: string) => params.append('genre', g));
            setSelectedGenres(newFilters.genre);
        }

        // Reset page to 1 when filters change
        params.set('page', '1');

        router.push(`/catalog?${params.toString()}`);
    };

    const handleGenreToggle = (slug: string) => {
        const newGenres = selectedGenres.includes(slug)
            ? selectedGenres.filter(g => g !== slug)
            : [...selectedGenres, slug];
        updateFilters({ genre: newGenres });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <PageNavigation />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        CATALOG
                    </h1>
                    <div className="h-2 w-32 bg-primary" />
                </div>

                {/* Filter Toggle (Mobile) */}
                <Button
                    className="md:hidden w-full mb-4 brutal-border brutal-shadow"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    FILTERS
                </Button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`
                        w-full md:w-64 space-y-6 
                        ${showFilters ? 'block' : 'hidden md:block'}
                    `}>
                        <div className="brutal-border bg-card p-4 space-y-6">
                            {/* Search */}
                            <div className="space-y-2">
                                <Label>Search Title</Label>
                                <Input
                                    placeholder="Search..."
                                    value={title}
                                    onChange={(e) => updateFilters({ title: e.target.value })}
                                    className="brutal-border"
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={(val) => updateFilters({ status: val === 'all' ? '' : val })}>
                                    <SelectTrigger className="brutal-border">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Currently Airing">Currently Airing</SelectItem>
                                        <SelectItem value="Finished Airing">Finished Airing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Type */}
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={type} onValueChange={(val) => updateFilters({ type: val === 'all' ? '' : val })}>
                                    <SelectTrigger className="brutal-border">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="TV">TV Series</SelectItem>
                                        <SelectItem value="Movie">Movie</SelectItem>
                                        <SelectItem value="OVA">OVA</SelectItem>
                                        <SelectItem value="ONA">ONA</SelectItem>
                                        <SelectItem value="Special">Special</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Order */}
                            <div className="space-y-2">
                                <Label>Sort By</Label>
                                <Select value={order} onValueChange={(val) => updateFilters({ order: val })}>
                                    <SelectTrigger className="brutal-border">
                                        <SelectValue placeholder="Sort By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="latest">Latest Added</SelectItem>
                                        <SelectItem value="update">Latest Update</SelectItem>
                                        <SelectItem value="popular">Popular</SelectItem>
                                        <SelectItem value="title">A-Z</SelectItem>
                                        <SelectItem value="titlereverse">Z-A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Genres */}
                            <div className="space-y-2">
                                <Label>Genres</Label>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border-2 border-border">
                                    {genres.map((genre) => (
                                        <div key={genre.slug} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={genre.slug}
                                                checked={selectedGenres.includes(genre.slug)}
                                                onCheckedChange={() => handleGenreToggle(genre.slug)}
                                            />
                                            <label
                                                htmlFor={genre.slug}
                                                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer uppercase"
                                            >
                                                {genre.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <Button
                                variant="destructive"
                                className="w-full brutal-border brutal-shadow-sm"
                                onClick={() => {
                                    setTitle('');
                                    setStatus('');
                                    setType('');
                                    setOrder('latest');
                                    setSelectedGenres([]);
                                    router.push('/catalog');
                                }}
                            >
                                <X className="mr-2 h-4 w-4" />
                                RESET FILTERS
                            </Button>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1">
                        {loading ? (
                            <SkeletonGrid />
                        ) : (
                            <>
                                <ContentGrid
                                    title={`Results (${items.length})`}
                                    items={items}
                                />

                                {/* Brutal Pagination */}
                                {pagination && pagination.total_pages > 1 && (
                                    <div className="mt-8 brutal-border brutal-shadow-lg bg-background p-6">
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            {/* Previous Page */}
                                            <Button
                                                disabled={!pagination.has_prev_page}
                                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                                className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all text-foreground disabled:opacity-50 disabled:cursor-not-allowed h-auto rounded-none"
                                                variant="ghost"
                                            >
                                                ← PREV
                                            </Button>

                                            {/* Page Numbers */}
                                            <div className="flex items-center gap-2 hidden md:flex">
                                                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
                                                    .filter(pageNum => {
                                                        return (
                                                            pageNum === 1 ||
                                                            pageNum === pagination.total_pages ||
                                                            Math.abs(pageNum - pagination.current_page) <= 1
                                                        );
                                                    })
                                                    .map((pageNum, idx, arr) => {
                                                        const prevPageNum = arr[idx - 1];
                                                        const showEllipsis = prevPageNum && pageNum - prevPageNum > 1;

                                                        return (
                                                            <div key={pageNum} className="flex items-center gap-2">
                                                                {showEllipsis && (
                                                                    <span className="font-black text-muted-foreground">...</span>
                                                                )}
                                                                {pageNum === pagination.current_page ? (
                                                                    <div className="brutal-border bg-primary text-primary-foreground px-4 py-2 font-black min-w-[3rem] text-center">
                                                                        {pageNum}
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handlePageChange(pageNum)}
                                                                        className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black hover:brutal-shadow transition-all min-w-[3rem] text-center"
                                                                    >
                                                                        {pageNum}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </div>

                                            {/* Mobile Page Indicator (Simple) */}
                                            <div className="md:hidden font-black bg-accent border-2 border-foreground px-4 py-2">
                                                {pagination.current_page} / {pagination.total_pages}
                                            </div>

                                            {/* Next Page */}
                                            <Button
                                                disabled={!pagination.has_next_page}
                                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                                className="brutal-border brutal-shadow-sm bg-card px-4 py-2 font-black uppercase hover:brutal-shadow transition-all text-foreground disabled:opacity-50 disabled:cursor-not-allowed h-auto rounded-none"
                                                variant="ghost"
                                            >
                                                NEXT →
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
