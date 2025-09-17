<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::paginate(5);
        return response()->json($products);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string',
            'price' => 'required|numeric|min:1',
        ]);
        
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description ?? '',
            'price' => $request->price,
        ]);
        
        return response()->json($product, 201);
    }
    
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:1',
        ]);
        
        $updated = Product::where('id', $request->id)->update([
            'name' => $request->name,
            'description' => $request->description ?? '',
            'price' => $request->price,
        ]);
        
        if ($updated) {
            $product = Product::find($request->id);
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found or not updated'], 404);
        }
    }
    
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
    
    public function search(Request $request)
    {
        $query = Product::query();
        
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        
        $products = $query->paginate(5);
        
        return response()->json($products);
    }
}

