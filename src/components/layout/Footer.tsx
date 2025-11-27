export function Footer() {
  return (
    <footer className="border-t-4 border-foreground bg-card py-12 mt-20">
      <div className="container">
        <div className="brutal-grid-lg py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">
                BELLO<span className="text-primary">NIME</span>
              </h3>
              <div className="h-1 w-16 bg-primary" />
            </div>

            {/* Disclaimer */}
            <div className="brutal-border p-4 bg-background">
              <p className="font-bold uppercase text-xs mb-2">⚠️ DISCLAIMER</p>
              <p className="text-sm">
                Educational purposes only
              </p>
            </div>

            {/* Copyright */}
            <div className="flex items-start justify-start md:justify-end">
              <div className="brutal-border brutal-shadow-sm bg-primary px-6 py-3">
                <p className="font-black uppercase text-primary-foreground">
                  © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
