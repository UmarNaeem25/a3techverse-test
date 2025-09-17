<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::truncate();

        $products = [
            ['name' => 'Laptop', 'description' => 'High performance laptop', 'price' => 1200],
            ['name' => 'Smartphone', 'description' => 'Latest smartphone model', 'price' => 800],
            ['name' => 'Headphones', 'description' => 'Noise-cancelling headphones', 'price' => 150],
            ['name' => 'Keyboard', 'description' => 'Mechanical keyboard', 'price' => 100],
            ['name' => 'Mouse', 'description' => 'Wireless mouse', 'price' => 50],
            ['name' => 'Monitor', 'description' => '4K resolution monitor', 'price' => 400],
            ['name' => 'Printer', 'description' => 'Color inkjet printer', 'price' => 200],
            ['name' => 'Tablet', 'description' => '10-inch display tablet', 'price' => 300],
            ['name' => 'Camera', 'description' => 'Digital SLR camera', 'price' => 900],
            ['name' => 'Speaker', 'description' => 'Bluetooth portable speaker', 'price' => 120],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
