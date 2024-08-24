import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, QrCodeIcon, BellAlertIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'QR Code Payments',
    description:
      'Allow customers to make payments quickly and securely by scanning a QR code. Simplifies the transaction process.',
    icon: QrCodeIcon,
  },
  {
    name: 'Real-Time Notifications',
    description:
      'Receive instant notifications for every transaction, ensuring you’re always in the loop with what’s happening.',
    icon: BellAlertIcon,
  },
  {
    name: 'Incoming Rupees Tracking',
    description: 'Monitor all incoming transactions in real-time, ensuring you stay on top of your revenue flow.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Instant Off-Ramp Transactions',
    description: 'Convert digital payments to cash instantly, with secure and reliable off-ramp solutions.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Simple Queues',
    description:
      'Organize and manage transaction queues effectively, enhancing the efficiency of your operations.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Security',
    description:
      'Leverage advanced security features, including multi-factor authentication, to safeguard your assets.',
    icon: FingerPrintIcon,
  },
]

export default function MerchantFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Merchant Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tools to Empower Your Business
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform offers a range of features designed to streamline your operations, secure transactions, and enhance customer interactions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
