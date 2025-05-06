"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

interface Order {
  _id: string;
  customer: CustomerInfo;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Hämta alla ordrar när sidan laddas
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError('Det gick inte att hämta ordrarna. Försök igen senare.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Funktion för att uppdatera orderstatus
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      // Uppdatera listan med ordrar i UI:t
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus as Order['status'] } 
            : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  // Visa orderdetaljer
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Formatera datum
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-gray-500">Laddar ordrar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-gray-500">Inga ordrar hittades.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">Ordrar</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kund
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Totalt
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className={expandedOrderId === order._id ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer.name}<br />
                    <span className="text-xs">{order.customer.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.total} kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status === 'pending' ? 'Väntande' :
                       order.status === 'processing' ? 'Behandlas' :
                       order.status === 'shipped' ? 'Skickad' :
                       order.status === 'delivered' ? 'Levererad' :
                       'Avbruten'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      onClick={() => toggleOrderDetails(order._id)}
                      variant="outline"
                      size="sm"
                    >
                      {expandedOrderId === order._id ? 'Dölj detaljer' : 'Visa detaljer'}
                    </Button>
                  </td>
                </tr>
                
                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-medium mb-2">Kundinformation</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm"><span className="font-medium">Namn:</span> {order.customer.name}</p>
                            <p className="text-sm"><span className="font-medium">E-post:</span> {order.customer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm"><span className="font-medium">Adress:</span> {order.customer.address || 'Ej angivet'}</p>
                            <p className="text-sm"><span className="font-medium">Telefon:</span> {order.customer.phone || 'Ej angivet'}</p>
                          </div>
                        </div>
                        
                        <h3 className="font-medium mb-2">Produkter</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Produkt</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Pris</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Antal</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Summa</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm">{item.product.name || 'Produkt saknas'}</td>
                                <td className="px-4 py-2 text-sm">{item.price} kr</td>
                                <td className="px-4 py-2 text-sm">{item.quantity}</td>
                                <td className="px-4 py-2 text-sm">{item.price * item.quantity} kr</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Totalsumma:</td>
                              <td className="px-4 py-2 text-sm font-medium">{order.total} kr</td>
                            </tr>
                          </tfoot>
                        </table>
                        
                        <div className="mt-4 flex items-center gap-2">
                          <label htmlFor={`status-${order._id}`} className="text-sm font-medium">
                            Uppdatera status:
                          </label>
                          <select
                            id={`status-${order._id}`}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          >
                            <option value="pending">Väntande</option>
                            <option value="processing">Behandlas</option>
                            <option value="shipped">Skickad</option>
                            <option value="delivered">Levererad</option>
                            <option value="cancelled">Avbruten</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
