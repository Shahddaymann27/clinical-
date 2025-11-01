'motion/react';
import { Lock, Mail, Eye, EyeOff, Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent } from './ui/card';

interface LoginPageProps {
  onSwitchToSignUp: () => void;
  onNeedHelp?: () => void;
}

const customerReviews = [
  {
    name: 'Sarah Anderson',
    service: 'Dermatology',
    rating: 5,
    review: 'The dermatology team at JORY transformed my skin. Professional, caring, and results beyond my expectations.',
    image: '👩🏼',
    location: 'Dubai, UAE'
  },
  {
    name: 'Michael Chen',
    service: 'Nutrition',
    rating: 5,
    review: 'The personalized nutrition program helped me achieve my wellness goals. The expertise here is unmatched.',
    image: '👨🏻',
    location: 'Abu Dhabi, UAE'
  },
  {
    name: 'Emma Martinez',
    service: 'Beauty - Fillers',
    rating: 5,
    review: 'Natural, elegant results with their beauty treatments. The attention to detail and luxury experience is exceptional.',
    image: '👩🏽',
    location: 'Sharjah, UAE'
  },
  {
    name: 'James Thompson',
    service: 'Dermatology',
    rating: 5,
    review: 'Outstanding clinic with world-class specialists. My skin concerns were addressed professionally and effectively.',
    image: '👨🏼',
    location: 'Dubai, UAE'
  }
];

export function LoginPage({ onSwitchToSignUp, onNeedHelp }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt', { email, password, rememberMe });
  };

  return (
    <div className="size-full bg-white overflow-y-auto overflow-x-hidden relative">
      {/* Decorative background elements - more subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1 }}
        className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#B8985F' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: '#D4C5A9' }}
      />

      <div className="w-full max-w-md px-4 sm:px-8 py-8 sm:py-12 mx-auto relative z-10">
        {/* Logo/Clinic Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            <h1 className="text-5xl tracking-wider mb-3" style={{ 
              background: 'linear-gradient(135deg, #3C3C3C 0%, #5A5A5A 50%, #B8985F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              JORY
            </h1>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8985F] to-transparent opacity-60" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-gray-400 tracking-widest uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '0.25em' }}
          >
            Aesthetic Medical Clinic
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" 
                  strokeWidth={1.5}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 border-gray-100 focus:border-[#B8985F] focus:ring-1 focus:ring-[#B8985F]/30 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" 
                  strokeWidth={1.5}
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 h-12 border-gray-100 focus:border-[#B8985F] focus:ring-1 focus:ring-[#B8985F]/30 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-200"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-500 cursor-pointer"
                  style={{ fontSize: '0.875rem' }}
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-[#A08758] hover:text-[#B8985F] transition-colors"
                style={{ fontSize: '0.875rem' }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-12 text-white tracking-wide transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #3C3C3C 0%, #5A5A5A 50%, #B8985F 100%)',
                }}
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-7 text-center text-gray-500" style={{ fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onSwitchToSignUp}
              className="text-[#A08758] hover:text-[#B8985F] transition-colors"
            >
              Sign up now
            </button>
          </p>

          {/* Help Link */}
          {onNeedHelp && (
            <p className="mt-4 text-center text-gray-400" style={{ fontSize: '0.813rem' }}>
              Need assistance?{' '}
              <button 
                type="button"
                onClick={onNeedHelp}
                className="text-[#A08758] hover:text-[#B8985F] transition-colors underline decoration-dotted underline-offset-2"
              >
                Visit Help & Support
              </button>
            </p>
          )}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-center text-gray-300 italic tracking-wide"
          style={{ fontSize: '0.875rem' }}
        >
          Where science meets beauty
        </motion.p>
      </div>

      {/* Customer Reviews Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-block mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-wider mb-2" style={{ 
                background: 'linear-gradient(135deg, #3C3C3C 0%, #5A5A5A 50%, #B8985F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Client Testimonials
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8985F] to-transparent opacity-60" />
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Discover why our clients trust JORY Clinic for their aesthetic and wellness journey
            </p>
          </motion.div>

          {/* Reviews Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {customerReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-gray-100 hover:border-[#B8985F] transition-all duration-300 h-full hover:shadow-lg group">
                  <CardContent className="p-4 sm:p-6">
                    {/* Quote Icon */}
                    <div className="mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group-hover:bg-[#B8985F20] transition-colors" style={{ backgroundColor: '#F5F5F5' }}>
                        <Quote className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#B8985F' }} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5 mb-3 sm:mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B8985F]"
                          style={{ color: '#B8985F' }}
                          strokeWidth={0}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base italic">
                      "{review.review}"
                    </p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl" style={{ backgroundColor: '#F5F5F5' }}>
                        {review.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base truncate" style={{ color: '#3C3C3C', fontWeight: 600 }}>
                          {review.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">{review.service}</p>
                        <p className="text-xs text-gray-300 truncate">{review.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { value: '5,000+', label: 'Happy Clients' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '15+', label: 'Years Experience' },
              { value: '3', label: 'Departments' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-[#B8985F] transition-all duration-300 hover:shadow-md"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2" style={{ 
                  background: 'linear-gradient(135deg, #B8985F 0%, #A08758 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600
                }}>
                  {stat.value}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <p className="text-gray-400 italic text-sm sm:text-base mb-4 px-4">
              Join thousands of satisfied clients on their journey to beauty and wellness
            </p>
            <Button
              onClick={onSwitchToSignUp}
              className="text-white tracking-wide transition-all duration-300 hover:shadow-lg px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base"
              style={{ 
                background: 'linear-gradient(135deg, #B8985F 0%, #A08758 100%)',
              }}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
