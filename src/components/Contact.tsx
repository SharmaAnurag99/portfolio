import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Headphones, Mail, Facebook, Linkedin, Github, Send, MessageCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again or reach out via WhatsApp.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918318529481?text=Hi Anurag, I saw your portfolio and would like to connect!', '_blank');
  };

  return (
    <section id="contact" className="py-24 section-cream">
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl mb-16 animate-on-scroll">
          CONTACT ME
        </h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="bg-muted/50 rounded-3xl p-8 md:p-10 animate-on-scroll">
            <div className="space-y-10">
              <div>
                <MapPin className="text-foreground mb-4" size={24} />
                <h3 className="font-display text-lg mb-1">LOCATION:</h3>
                <p className="text-muted-foreground">New Delhi, India</p>
              </div>

              <div>
                <Headphones className="text-foreground mb-4" size={24} />
                <h3 className="font-display text-lg mb-1">CONTACT NUMBER:</h3>
                <p className="text-muted-foreground">+91 83185 29481</p>
              </div>

              <div>
                <Mail className="text-foreground mb-4" size={24} />
                <h3 className="font-display text-lg mb-1">EMAIL ME:</h3>
                <p className="text-muted-foreground">sharmaanurag9969@gmail.com</p>
              </div>

              <div>
                <h3 className="font-display text-lg mb-4">SOCIALS</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-on-scroll">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    placeholder="Steve Milner"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent border-border h-14 pr-12"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="hello@websitename.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-border h-14 pr-12"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider mb-2 block">
                Subject
              </label>
              <div className="relative">
                <Input
                  placeholder="Your Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-transparent border-border h-14 pr-12"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider mb-2 block">
                Your Message
              </label>
              <Textarea
                placeholder="Write Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-transparent border-border min-h-[150px] resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-14 px-8 rounded-full text-base font-medium flex-1 gap-2 bg-foreground text-background hover:scale-[1.02] hover:bg-foreground/90 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send size={18} />}
              </Button>

              <Button
                type="button"
                size="lg"
                onClick={handleWhatsApp}
                className="h-14 px-8 rounded-full text-base font-medium flex-1 gap-2 bg-transparent text-foreground border-2 border-border hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
              >
                Let's Chat
                <MessageCircle size={18} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
