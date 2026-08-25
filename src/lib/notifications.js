// Automated Notification Service for Dynamind Studios via Resend API
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

export const isResendConfigured = Boolean(RESEND_API_KEY);

/**
 * Send booking confirmation email with Google Meet room link
 */
export async function sendMeetConfirmationEmail({
  clientName,
  businessName,
  email,
  date,
  time,
  services,
  meetLink
}) {
  if (!isResendConfigured || !email) {
    console.log("Resend not configured or no email provided, skipping email dispatch.");
    return { success: false, reason: 'missing_config' };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050507; color: #ffffff; padding: 24px; }
          .container { max-width: 580px; margin: 0 auto; background: #0c0c10; border: 1px solid #22222a; border-radius: 16px; padding: 32px; }
          .header { text-align: center; border-bottom: 1px solid #1a1a22; padding-bottom: 24px; margin-bottom: 24px; }
          .logo { font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 11px; font-family: monospace; border-radius: 9999px; margin-bottom: 12px; }
          h1 { font-size: 22px; margin: 0 0 8px 0; color: #ffffff; }
          p { color: #a1a1aa; font-size: 14px; line-height: 1.6; }
          .details-box { background: #121218; border: 1px solid #22222c; border-radius: 12px; padding: 20px; margin: 24px 0; font-size: 13px; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #1a1a24; padding-bottom: 8px; }
          .detail-label { color: #71717a; }
          .detail-value { color: #ffffff; font-weight: 600; text-align: right; }
          .cta-btn { display: block; text-align: center; background: #ffffff; color: #000000; font-weight: bold; padding: 14px 24px; border-radius: 12px; text-decoration: none; font-size: 14px; margin: 28px 0 16px 0; }
          .footer { text-align: center; font-size: 11px; color: #52525b; border-top: 1px solid #181820; padding-top: 20px; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">CONFIRMACIÓN OFICIAL</div>
            <div class="logo">DYNAMIND STUDIOS</div>
          </div>

          <h1>¡Tu sesión de diagnóstico está confirmada!</h1>
          <p>Hola <strong>${clientName}</strong>, hemos reservado y validado tu espacio con la dirección de Dynamind Studios para tu marca <strong>${businessName}</strong>.</p>

          <div class="details-box">
            <div class="detail-row">
              <span class="detail-label">Fecha:</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Hora:</span>
              <span class="detail-value">${time} (45 minutos)</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Servicios:</span>
              <span class="detail-value">${Array.isArray(services) ? services.join(', ') : services}</span>
            </div>
            <div class="detail-row" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
              <span class="detail-label">Modalidad:</span>
              <span class="detail-value">Videollamada en Google Meet</span>
            </div>
          </div>

          <a href="${meetLink}" target="_blank" class="cta-btn">
            Unirse a la Sala de Google Meet
          </a>

          <p style="font-size: 12px; text-align: center; color: #71717a;">
            Enlace de respaldo: <a href="${meetLink}" style="color: #93c5fd;">${meetLink}</a>
          </p>

          <div class="footer">
            © ${new Date().getFullYear()} Dynamind Studios • Ingeniería Digital & Arquitectura de Conversión<br>
            Medellín, Colombia • contacto@dynamindstudios.com
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Dynamind Studios <onboarding@resend.dev>',
        to: [email],
        subject: `Diagnóstico Estratégico Confirmado | ${businessName || clientName}`,
        html: htmlContent
      })
    });

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    console.error("Error sending confirmation email via Resend:", error);
    return { success: false, error };
  }
}
