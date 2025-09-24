export default function Home() {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Sicherheits-Dashboard</h1>
        <p>Aktuelle Informationen zur Systemsicherheit und Compliance-Status Ihrer Gesundheitsdaten</p>
      </div>
      
      {/* System Status Grid */}
      <div className="status-grid">
        <div className="status-card">
          <div className="status-header">
            <div className="status-icon status-operational"></div>
            <div className="status-title">Systemstatus</div>
          </div>
          <div className="status-detail">Alle Systeme funktionieren normal<br />
          Letzte Überprüfung: Heute, 14:23 Uhr</div>
        </div>
        
        <div className="status-card">
          <div className="status-header">
            <div className="status-icon status-operational"></div>
            <div className="status-title">Datensicherheit</div>
          </div>
          <div className="status-detail">Verschlüsselung aktiv, keine Anomalien<br />
          Nächste Sicherheitsprüfung: 28.09.2025</div>
        </div>
        
        <div className="status-card">
          <div className="status-header">
            <div className="status-icon status-operational"></div>
            <div className="status-title">Backup-Status</div>
          </div>
          <div className="status-detail">Letztes Backup: Heute, 02:15 Uhr<br />
          Wiederherstellungstest: Erfolgreich</div>
        </div>
      </div>
      
      {/* Recent Security Incidents */}
      <div className="incident-section">
        <div className="section-header">
          <h2 className="section-title">Aktuelle Sicherheitsereignisse</h2>
          <p className="section-subtitle">Transparente Kommunikation über alle sicherheitsrelevanten Ereignisse der letzten 30 Tage</p>
        </div>
        
        <div className="incident-item">
          <div className="incident-header">
            <div className="incident-title">Routinewartung - Sicherheitsupdates eingespielt</div>
            <div className="incident-severity severity-low">Niedrig</div>
          </div>
          <div className="incident-meta">
            <span>📅 20.09.2025</span>
            <span>⏱️ Dauer: 15 Minuten</span>
            <span>👥 Betroffene Systeme: Alle</span>
          </div>
          <div className="incident-description">
            Planmäßige Installation von Sicherheitsupdates für das Betriebssystem und Anwendungskomponenten. 
            Keine Patientendaten betroffen. System war für 15 Minuten nicht verfügbar.
          </div>
        </div>
        
        <div className="incident-item">
          <div className="incident-header">
            <div className="incident-title">Erhöhte Login-Versuche erkannt und blockiert</div>
            <div className="incident-severity severity-medium">Mittel</div>
          </div>
          <div className="incident-meta">
            <span>📅 15.09.2025</span>
            <span>⏱️ Dauer: 2 Stunden</span>
            <span>🛡️ Status: Behoben</span>
          </div>
          <div className="incident-description">
            Automatische Erkennung und Blockierung verdächtiger Login-Versuche aus unbekannten IP-Bereichen. 
            Alle betroffenen Konten wurden vorsorglich gesperrt und Nutzer benachrichtigt. Keine Daten kompromittiert.
          </div>
        </div>
      </div>
      
      {/* Compliance Status */}
      <div className="compliance-section">
        <div className="compliance-card">
          <h3 className="compliance-title">DSGVO Compliance</h3>
          <div className="compliance-status">
            <span className="check-icon">✓</span>
            <span>Vollständig konform</span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Letzte Auditierung: August 2025<br />
            Nächste Überprüfung: Februar 2026
          </div>
          <a href="#" className="download-btn">Compliance-Bericht herunterladen</a>
        </div>
        
        <div className="compliance-card">
          <h3 className="compliance-title">Medizinprodukte-Verordnung (MDR)</h3>
          <div className="compliance-status">
            <span className="check-icon">✓</span>
            <span>Zertifiziert</span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            CE-Kennzeichnung: Gültig<br />
            Zertifizierungsstelle: TÜV SÜD
          </div>
          <a href="#" className="download-btn">Zertifikat anzeigen</a>
        </div>
        
        <div className="compliance-card">
          <h3 className="compliance-title">ISO 27001 Zertifizierung</h3>
          <div className="compliance-status">
            <span className="check-icon">✓</span>
            <span>Aktiv</span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>
            Gültig bis: März 2026<br />
            Jährliche Überwachung: Bestanden
          </div>
          <a href="#" className="download-btn">Zertifikat herunterladen</a>
        </div>
      </div>
      
      {/* Security Measures Overview */}
      <div className="incident-section">
        <div className="section-header">
          <h2 className="section-title">Unsere Sicherheitsmaßnahmen</h2>
          <p className="section-subtitle">Umfassender Schutz Ihrer Gesundheitsdaten</p>
        </div>
        
        <div className="incident-item">
          <div className="incident-title">End-to-End Verschlüsselung</div>
          <div className="incident-description">
            Alle Datenübertragungen und gespeicherte Informationen werden mit AES-256 verschlüsselt. 
            Schlüsselverwaltung erfolgt in zertifizierten HSM-Modulen.
          </div>
        </div>
        
        <div className="incident-item">
          <div className="incident-title">Kontinuierliche Überwachung</div>
          <div className="incident-description">
            24/7 Security Operations Center (SOC) mit KI-gestützter Anomalieerkennung und 
            sofortiger Reaktion auf verdächtige Aktivitäten.
          </div>
        </div>
        
        <div className="incident-item">
          <div className="incident-title">Regelmäßige Penetrationstests</div>
          <div className="incident-description">
            Vierteljährliche Sicherheitstests durch externe Experten und kontinuierliche 
            Schwachstellenanalysen aller Systemkomponenten.
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="footer-info">
        <strong>Kontakt bei Sicherheitsfragen:</strong><br />
        E-Mail: security@medsafe-pro.de | Telefon: +49 (0) 211 1234567<br />
        Incident Response Team: 24/7 verfügbar
        
        <div className="last-updated">
          Letzte Aktualisierung: 23. September 2025, 15:42 Uhr
        </div>
      </div>
    </div>
  );
}
