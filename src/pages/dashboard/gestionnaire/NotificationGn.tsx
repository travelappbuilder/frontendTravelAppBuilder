import React, { useEffect, useState } from "react";

interface Notification {
  id: number;
  type: string;
  message: string;
  date: string;
  level: string;
  vu: boolean;
}

interface NotificationProps {
  updateNavbarCount?: (count: number) => void;
}

const NotificationGn: React.FC<NotificationProps> = ({ updateNavbarCount }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // initial vide
  const [filterType, setFilterType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  // Notifications simulées
  const defaultNotifications: Notification[] = [
    { id: 1, type: "trajet", message: "Nouveau trajet créé : Douala → Yaoundé", date: "2025-01-15T08:10:00", level: "success", vu: false },
    { id: 2, type: "activation", message: "Votre trajet ID-027 a été activé par le Directeur d’Agence.", date: "2025-01-15T09:21:00", level: "info", vu: false },
    { id: 3, type: "client", message: "Plainte d’un client : retard de 25 minutes sur le trajet #014.", date: "2025-01-15T10:07:00", level: "warning", vu: false },
    { id: 4, type: "reservation", message: "Nouvelle réservation : 3 places sur le trajet Yaoundé → Ngaoundéré.", date: "2025-01-15T11:15:00", level: "success", vu: false },
    { id: 5, type: "bus", message: "Vérification recommandée : niveau d’huile du bus #D12 faible.", date: "2025-01-15T12:32:00", level: "danger", vu: false },
    { id: 6, type: "accident", message: "Accident signalé sur le trajet Douala → Kribi, intervention en cours.", date: "2025-01-15T13:45:00", level: "danger", vu: false },
    { id: 7, type: "trajet", message: "Mise à jour du trajet ID-027 : changement d'horaire.", date: "2025-01-15T14:00:00", level: "info", vu: false },
    { id: 8, type: "activation", message: "Activation du trajet ID-027 confirmée.", date: "2025-01-15T14:30:00", level: "info", vu: false }
  ];

  // ⚡ Initialisation propre : on vide le localStorage et on charge les notifications simulées
  useEffect(() => {
    localStorage.removeItem("notificationData"); // supprime les anciennes données
    setNotifications(defaultNotifications);
    updateNavbarCount && updateNavbarCount(defaultNotifications.filter(n => !n.vu).length);
  }, []);

  // ⚡ Mise à jour du localStorage et du compteur Navbar
  useEffect(() => {
    localStorage.setItem("notificationData", JSON.stringify(notifications));
    const unread = notifications.filter(n => !n.vu).length;
    updateNavbarCount && updateNavbarCount(unread);
  }, [notifications, updateNavbarCount]);

  const badgeColor = (notif: Notification) => {
    const base = notif.vu ? "opacity-50" : "";
    switch (notif.level) {
      case "success": return `bg-green-100 border-green-600 text-green-700 ${base}`;
      case "info": return `bg-blue-100 border-blue-600 text-blue-700 ${base}`;
      case "warning": return `bg-yellow-100 border-yellow-600 text-yellow-700 ${base}`;
      case "danger": return `bg-red-100 border-red-600 text-red-700 ${base}`;
      default: return `bg-gray-200 border-gray-400 text-gray-700 ${base}`;
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "trajet": return "🚍";
      case "activation": return "✅";
      case "client": return "⚠️";
      case "reservation": return "🧾";
      case "annulation": return "❌";
      case "bus": return "🛠";
      case "accident": return "🚨";
      default: return "🔔";
    }
  };

  const markAsRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, vu: true } : n));
  const deleteNotification = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));
  const clearAll = () => setNotifications([]);

  const filtered = notifications
    .filter(n => filterType === "all" ? true : n.type === filterType)
    .sort((a, b) => sortOrder === "recent" 
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        {notifications.length > 0 && <button onClick={clearAll} className="text-red-600 hover:text-red-800 font-semibold">Tout supprimer</button>}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select className="p-2 border rounded" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">Tous types</option>
          <option value="trajet">Trajets</option>
          <option value="activation">Activations</option>
          <option value="client">Plaintes</option>
          <option value="reservation">Réservations</option>
          <option value="bus">Bus</option>
          <option value="accident">Incidents</option>
        </select>
        <select className="p-2 border rounded" value={sortOrder} onChange={e => setSortOrder(e.target.value as "recent" | "oldest")}>
          <option value="recent">Les plus récents</option>
          <option value="oldest">Les plus anciens</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Aucune notification à afficher.</p>
      ) : (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {filtered.map(n => (
            <div key={n.id}
              className={`p-4 rounded-lg shadow bg-white border-l-4 cursor-pointer ${badgeColor(n)}`}
              onClick={() => markAsRead(n.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span>{typeIcon(n.type)}</span>
                  <p className="font-semibold">{n.message}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500">{new Date(n.date).toLocaleString()}</p>
                  <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                    className="text-red-600 hover:text-red-800">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationGn;
