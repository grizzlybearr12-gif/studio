"use client"

import { RegisterProviderForm } from "@/components/auth/RegisterProviderForm"

export default function RegisterProviderPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Join CaterEase</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Grow your business by connecting with customers across India.
        </p>
      </div>
      <RegisterProviderForm />
    </div>
  )
}
