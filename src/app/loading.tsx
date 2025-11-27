import { Loader2 } from 'lucide-react';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function Loading() {
  return (
    <>
    <PageNavigation />
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
    </>
  );
}
